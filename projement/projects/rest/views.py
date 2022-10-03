
from urllib import response
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from projects.models import Project
from projects.rest.serializers import ProjectSerializer
from django.db.models import F
from rest_framework.pagination import LimitOffsetPagination
from django.db import transaction

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = (
        Project.objects.select_related("company")
        .prefetch_related("company__tags")
    )
    serializer_class = ProjectSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = [permissions.IsAuthenticated]    

    def update(self, request, *args, **kwargs):
        project = self.get_object()
        actual_design = request.data.get('actual_design') + project.actual_design
        actual_development = request.data.get('actual_development') + project.actual_development
        actual_testing = request.data.get('actual_testing') + project.actual_testing
        if actual_design > 9999:
            return Response({"actual_design": "value exceeded"}, status=status.HTTP_400_BAD_REQUEST)
        elif actual_development > 9999:
            return Response({"actual_development": "value exceeded"}, status=status.HTTP_400_BAD_REQUEST)
        elif actual_testing > 9999:
            return Response({"actual_testing": f"value exceeded total actual testing hours is {actual_testing} it must be less then 9999 "}, status=status.HTTP_400_BAD_REQUEST)
        try:
            with transaction.atomic():
                project.actual_design = F('actual_design') + request.data.get('actual_design')
                project.actual_development = F('actual_development') + request.data.get('actual_development')
                project.actual_testing = F('actual_testing') + request.data.get('actual_testing')
                project.save(update_fields = ["actual_design", "actual_development", "actual_testing"])
            return Response({"message":"Hours updated successfully", "status": status.HTTP_200_OK})
        except: 
            return Response({"error":"Somthing went wrong", "status": status.HTTP_400_BAD_REQUEST})
            