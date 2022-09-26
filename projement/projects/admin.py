from django.contrib import admin
from django.db.models import F

from projects.models import Company, Project, Tag


class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "start_date", "end_date")
    list_filter = ("company__name",)
    ordering = [F("end_date").desc(nulls_first=True), "company__name"]


    fieldsets = (
        (None, {"fields": ["company", "title", "start_date", "end_date"]}),
        (
            "Estimated hours",
            {
                "fields": [
                    "estimated_design",
                    "estimated_development",
                    "estimated_testing",
                ]
            },
        ),
        (
            "Actual hours",
            {"fields": ["actual_design", "actual_development", "actual_testing"]},
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj is None:
            return ()

        return ("company",)


admin.site.register(Company)
admin.site.register(Tag)
admin.site.register(Project, ProjectAdmin)
