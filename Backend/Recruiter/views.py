from .links import client_data
from Recruiter.models import Member
from rest_framework import status
from .serializers import *
from rest_framework import viewsets
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import *
from rest_framework.decorators import api_view, permission_classes, action
from django.contrib.auth import login, logout
from django.forms.models import model_to_dict
from django.shortcuts import render
from .csv_view import *

class ScoreFunctions:

    def get_section_scores(section_data):
        section_total_scores=[]
        print(section_data)
        for section_id in section_data['section_list']:
            section_scores=0
            print("``````````")
            print(section_id)
            questions = Question.objects.filter(section_id = section_id)
            print(questions)
            for question in questions:
                section_scores += question.total_marks
            # section_wise_marks_list[section_id] = section_scores
            section_total_scores.append(section_scores)
        return section_total_scores
    
    def get_applicant_total_marks(applicant_data):
        applicant_id = applicant_data['applicant_id'] 
        applicant_total_marks = {}

        total_marks=0
        sections = Section.objects.filter(round_id = applicant_data['round_id'])

        for section in sections:
            applicant_section_questions = Score.objects.filter(question_id__section_id=section.id, student_id=applicant_id)
            # print(applicant_section_questions)
            # print("*************\n\n")
            for applicant_question in applicant_section_questions:
                total_marks += (section.weightage) * (applicant_question.marks_awarded)
                
        applicant_total_marks[applicant_id] = total_marks
        return applicant_total_marks
    
    def get_question_info(section_data):

        section_marks = []
        score_data = Score.objects.filter(student_id = section_data['applicant_id'], question_id__section_id = section_data['section_id'])

        for score_instance in score_data:
            id = score_instance.id
            score = score_instance.score
            remarks = score_instance.remarks
            status = score_instance.status
            question = Question.objects.get(id = score_instance.question_id.id)

            question_data = QuestionSerializer(question)  
            
            assignees = []
            for member in question.assignees:
                member_data = MemberSerializer(member)
                assignees.append(member_data.data)
            print(assignees)

            response = {
                'id': id,
                'question': question_data.data,
                'score': score,
                'remarks': remarks,
                'status': status,
                'assignee': assignees
            }
            section_marks.append(response)
        return section_marks
    

class MemberViewset(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

# note: NOT BEING USED ANYMORE AS THE SEASON DATA IS BEING GOVERNED BY SeasonWiseViewset

class SeasonViewset(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer

class RoundViewset(viewsets.ModelViewSet):
    queryset = Round.objects.all()
    serializer_class = RoundSerializer
    # permission_classes = [delPermission]

    # def get_queryset(self):
    #     print("hellllllllllllllllllllllllllllllllllllo")
    #     print(self.request.user)
    #     return Round.objects.all()

class SectionViewset(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

    def get_section_scores(section_data, section_wise_marks_list):
        # section_total_scores=[]
        for section_id in section_data:
            section_scores=0
            questions = Question.objects.filter(section_id = section_id)
            for question in questions:
                section_scores += question.total_marks
            section_wise_marks_list[section_id] = section_scores
            # section_total_scores.append(section_scores)
        return section_wise_marks_list
    
    def list(self, request):
        sections = Section.objects.all()
        section_data = []
        section_wise_marks_list = {}
        for section in sections:
            section_data.append(section.id)
            section_wise_marks_list[section.id] = 0
        section_wise_scores = SectionViewset.get_section_scores(section_data, section_wise_marks_list)
        serializer = SectionWithRoundSerializer(sections,many=True)
        response_data = {
            'section_list': serializer.data,
            'section_total_scores_list': section_wise_scores
        }
        return Response(response_data)
     
class QuestionViewset(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


    def create_score(s_id):
        score = Score.objects.create(
            question_id = Question.objects.last(),
            student_id = s_id,
            scores_awarded = 0,
            rescores = "",
            status = 0
        )
        score.save()
        print("saved")


    def create(self, request, **kwargs):
        question = Question.objects.create(
            question_text = request.data.get('question_text'),
            ans = request.data.get('ans'),
            total_scores = int(request.data.get('total_scores')),
            section_id = Section.objects.get(id=int(request.data.get('section_id')))
        )
        print("*************************************")
        print(request.data)
        question.assignee_id.set(request.data.get('assignee_id'))
        question.save()
        print('question saved')
        ques = Question.objects.last().section_id
        section = Section.objects.get(id = ques.id)
        season_id = Season.objects.get(id = section.round_id.season_id.id)
        applicants = Applicant.objects.filter(season_id = season_id)
        print("separated")
        for applicant in applicants:
            print('calling applicants')
            QuestionViewset.create_score(applicant)


        return Response("post")

class QuestionViewsetNoMemberData(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializerWithoutMemberData

class ApplicantViewsetData(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializerNormalData

class ApplicantViewsetImpData(viewsets.ModelViewSet):
    '''
        ApplicantViewset for Imp data, only accessible to the 3rd or 4th yearites, so applying the permission class, so made a different viewset, so that the access to others is not given by the has_permission method. 
    '''
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializerImpData
    # permission_classes = [ImpDataPermission]

class InterviewPanelViewset(viewsets.ModelViewSet):
    queryset = InterviewPanel.objects.all()
    serializer_class = InterviewPanelSerializer

class InterviewViewset(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    # permission_classes = [IsAbleToSeePersonalInfo]

class ScoreViewset(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    # permission_classes = [IsAbleToSeePersonalInfo]

class ApplicantStatusViewset(viewsets.ModelViewSet):
    queryset = ApplicantStatus.objects.all()
    serializer_class = ApplicantStatusSerializer

# note: CUSTOMIZED VIEWSETS
class SectionWiseQuestionViewset(viewsets.ModelViewSet):
    queryset = Question.objects.all()

    @action(detail=False, methods=['get'])
    def get_data(self, request, **kwargs):
        if not kwargs:
            return HttpResponse("Using questions api")
        else:
            r_id = kwargs.get('section_id')
            model = kwargs.get('model')
            if model == 'questions':
                model_data = QuestionSerializer(Question.objects.filter(section_id = r_id), many = True)
                if len(kwargs) == 2:
                    return Response(model_data.data)
                model_id = kwargs.get('model_id')
                model_data = QuestionSerializer(Question.objects.filter(section_id = r_id).filter(id = model_id), many = True)
                return Response(model_data.data)
            return HttpResponse("check SectionWiseQuestionViewset") 

class StatusAndSectionMarks(generics.CreateAPIView):

    queryset = ApplicantStatus.objects.all()
    serializer_class = ApplicantStatusSerializer

    @action(detail=False, methods=['get'])
    def get(self, request, **kwargs):
        applicant_id = kwargs.get('applicant_id')
        season_id = kwargs.get('season_id')
        rounds = Round.objects.filter(season_id = season_id)

        response_data = {}
        for round in rounds:
            response_data[round.id] = {}
            try:
                applicant_round = ApplicantStatus.objects.get(applicant_id = applicant_id, status_id=round.id)
            except ObjectDoesNotExist:
                print("^^^^^^^")
                pass
            else:
                print("******888")
                applicant_round_serializer = ApplicantStatusSerializer(applicant_round)
                print(applicant_round_serializer.data)
                print("*******")
                round_total_marks = ScoreFunctions.get_applicant_total_marks({
                    'applicant_id': applicant_id,
                    'round_id': round.id
                })

                response_data[round.id]['status'] = applicant_round_serializer.data

                response_data[round.id]['total_score'] = round_total_marks[applicant_id]
        return Response(response_data)

    def post(self, request):
        applicant_list = request.data['applicant_list']
        section_list = request.data['section_list']
        applicant_section_marks_list = []
        if len(applicant_list)>0 and len(section_list)>0:
            for Applicant_id in applicant_list:
                Applicant_section_data = {
                    'Applicant_id': Applicant_id,
                    'section_list': section_list
                }
                Applicant_section_marks = ScoreFunctions.get_section_scores(Applicant_section_data)
                applicant_section_marks_list.append(Applicant_section_marks)
        
        response_data={
            'status':'success',
            'data':applicant_section_marks_list
        }

        return Response(response_data)

# class Section


class RoundWiseSectionViewset(viewsets.ModelViewSet):
    queryset = Round.objects.all()

    @action(detail=False, methods=['get'])
    def get_data(self, request, **kwargs):
        if not kwargs:
            return HttpResponse("Using rounds api")
        else:
            r_id = kwargs.get('round_id')
            model = kwargs.get('model')
            if model == 'sections':
                model_data = SectionSerializer(Section.objects.filter(round_id = r_id), many = True)
                if len(kwargs) == 2:
                    return Response(model_data.data)
                model_id = kwargs.get('model_id')
                model_data = SectionSerializer(Section.objects.filter(round_id = r_id).filter(id = model_id), many = True)
                return Response(model_data.data)
            return HttpResponse("check roundwiseviewset")        

class SeasonWiseViewset(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    # permission_classes = [ImpDataPermission]

    @action(detail=False, methods=['get'])
    def get_data(self, request, **kwargs):
        if not kwargs:
            season_data = SeasonSerializer(Season.objects.all(), many = True)
            return Response(season_data.data)
        else:
            s_id = kwargs.get('season_id')
            if len(kwargs) == 1:
                season_data = SeasonSerializer(Season.objects.get(id = s_id))                    
                return Response(season_data.data)
            else:
                model = kwargs.get('model')
                if model == 'applicants':
                    model_data = ApplicantSerializerNormalData(Applicant.objects.filter(season_id = s_id), many = True)
                    if len(kwargs) == 2:
                        return Response(model_data.data)
                    else:
                        print(model_data)
                        model_id = kwargs.get('model_id')
                        model_data = ApplicantSerializerNormalData(Applicant.objects.filter(season_id = s_id).filter(id = model_id), many = True)
                        return Response(model_data.data)

                elif model == 'rounds':
                    model_data = RoundSerializer(Round.objects.filter(season_id = s_id), many = True)
                    if len(kwargs) == 2:
                        return Response(model_data.data)
                    else:
                        model_id = kwargs.get('model_id')
                        model_data = RoundSerializer(Round.objects.filter(season_id = s_id).filter(id = model_id), many = True)
                        return Response(model_data.data)

    @action(detail=False, methods=['post'])
    def post(self, request, **kwargs):
        if self.request.method == 'POST':
            if not kwargs:
                print(request.data)
                new_season = Season(
                    year = request.data.get('year'),
                    season_name = request.data.get('season_name'),
                    description = request.data.get('description')
                )
                new_season.save();
                return Response(
                    {
                        'msg' : "Season Added"
                    },
                    status= status.HTTP_201_CREATED
                )
            else:
                s_id = kwargs.get('season_id')
                if len(kwargs) == 1:
                    # todo: will do nothing as asked a specific season
                    return Response(
                        {
                            'msg': "Invalid Post Request"
                        }, 
                        status= status.HTTP_400_BAD_REQUEST
                    )
                else:
                    model = kwargs.get('model')
                    if model == 'applicants':
                        if len(kwargs) == 2:
                            new_applicant = Applicant(
                                
                            )
                            new_applicant.save();
                            return Response("Added applicant")
        return Response("Invalid Request")

    def delete(self, request, **kwargs):
        # season_id is the parameter fdefined in the urls, that's why the normal delete function not working
        season = Season.objects.get(id= kwargs.get('season_id'))
        season.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# todo: generalising parent child       
# model_dict = {
#     'rounds': Round,
#     'sections': Section
# }

# serializer_dict = {
#     'rounds': RoundSerializer,
#     'sections': SectionSerializer
# }

# class ParentWiseChildViewset(viewsets.ModelViewSet):
#     queryset = model_dict.get('rounds').objects.all()
#     parent_id_attribute = ""
#     @action(detail=False, methods=['get'])
#     def get_data(self, request, **kwargs):
#         if not kwargs:
#             return HttpResponse("Using parent api")
#         else:
#             model = kwargs.get('model')
#             p_id = kwargs.get('p_id')
#             parent_model = model_dict.get(kwargs.get('p_model'))
#             child_model = model_dict.get(model)
#             p_serializer = serializer_dict.get(kwargs.get('p_model'))
#             child_serializer = serializer_dict.get(model)
            
#             # if model == 'sections':
#             parent_id_attribute = kwargs.get('p_model')[:-1] + "_id"
#             child_id_attribute = model[:-1] + "_id"


#             model_data = p_serializer(parent_model.objects.filter(parent_id_attribute = p_id), many = True)
#             if len(kwargs) == 2:
#                 return Response(model_data.data)
#             model_id = kwargs.get('model_id')
#             model_data = p_serializer(parent_model.objects.filter( = p_id).filter(child_id_attribute = model_id), many = True)
#             return Response(model_data.data)
#             return HttpResponse("check roundwiseviewset")   