from django.contrib import admin

from .models import Department, JoinedDepartment

admin.site.register(Department)
admin.site.register(JoinedDepartment)