from django.shortcuts import render
from rest_framework import generics
import io, csv, codecs, pandas as pd
from rest_framework.response import Response
from .serializers import CSVUploadSerializer
from .models import Applicant, Season
from rest_framework import status

class UploadCSV(generics.CreateAPIView):
    serializer_class = CSVUploadSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception= True)
        file = serializer.validated_data['csv_file']
        print(serializer.is_valid())
        reader = pd.read_csv(file)

        for _, row in reader.iterrows():
            new_applicant = Applicant(
                       name = row['Name'],
                       academic_year = row["Academic Year"],
                       enroll_no = row['Enrollment Number'],
                       role= row["Role"],
                       project= row["Project"],
                       cg = row['CG'],
                       project_link= row["Project Link"],
                       phone_no = row['Phone Number'],
                       season_id = Season.objects.get(id=int(request.data.get('season_id'))),
                       status_id = 1
                    )
            new_applicant.save()
        return Response(
                    {
                        'status': 'uploaded',
                    },
                    status = status.HTTP_201_CREATED
                )