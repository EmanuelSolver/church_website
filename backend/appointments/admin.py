from django.contrib import admin
from .models import Appointments, AppointmentSlot

# Register your models here.
admin.site.register(Appointments)
admin.site.register(AppointmentSlot)