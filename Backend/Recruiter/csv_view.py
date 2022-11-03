from django.shortcuts import render
from rest_framework import generics
import io, csv, codecs, pandas as pd
from rest_framework.response import Response
from .serializers import CSVUploadSerializer
from .models import Applicant, Season
from rest_framework import status
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist

class UploadCSV(generics.CreateAPIView):
    serializer_class = CSVUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception= True)
        file = serializer.validated_data['csv_file']
        reader = pd.read_csv(file)
        season_id = request.data.get('season_id')
        print("***********")
        for _, row in reader.iterrows():
            try:
                applicant = Applicant.objects.get(enroll_no = row['Enrollment Number'])
            except ObjectDoesNotExist:
                new_applicant = Applicant(
                               name = row['Name'],
                               academic_year = row["Academic Year"],
                               enroll_no = row['Enrollment Number'],
                               role= row["Role"],
                               project= row["Project"],
                               cg = row['CG'],
                               project_link= row["Project Link"],
                               phone_no = row['Phone Number'],
                               season_id = Season.objects.get(id=int(season_id)),
                               status_id = 1
                            )
                new_applicant.save()

            else:
                applicant.name = row['Name']
                applicant.academic_year = row['Academic Year']
                applicant.role= row["Role"]
                applicant.project= row["Project"]
                applicant.cg = row['CG']
                applicant.project_link= row["Project Link"]
                applicant.phone_no = row['Phone Number']
                # todo: if csv is imported than we have students at the first stage
                applicant.status_id = 1
                applicant.save()

        return Response(
        {
            'status': 'uploaded',
        },
        status = status.HTTP_201_CREATED)
        
        
        