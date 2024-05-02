from django.contrib import admin
from .models import Department, Event, JoinedDepartment, Image, Sermon

admin.site.register(Department)
admin.site.register(Event)
admin.site.register(JoinedDepartment)
admin.site.register(Sermon)
admin.site.register(Image)

