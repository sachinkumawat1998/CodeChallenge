from rest_framework import viewsets, permissions
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
        .order_by(F("end_date").desc(nulls_first=True), "company__name")
    )
    serializer_class = ProjectSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = [permissions.IsAuthenticated]    

    def update(self, request, *args, **kwargs):
        project = self.queryset.select_for_update().get(pk=self.get_object().id)
        with transaction.atomic():
            project.actual_design = (F('actual_design')*0) + request.data.get('actual_design')
            project.actual_development = (F('actual_development')*0) + request.data.get('actual_development')
            project.actual_testing = (F('actual_testing')*0) + request.data.get('actual_testing')
            project.save(update_fields = ["actual_design", "actual_development", "actual_testing"])
        return Response({"msg": "Updated"})
