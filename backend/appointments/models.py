from django.db import models
from accounts.models import CustomUser

#set the time tickets the pastor is ready to meet
class AppointmentSlot(models.Model):
    pastor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    day = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.TextField(default="New")


class Appointments(models.Model):
    slot = models.ForeignKey(AppointmentSlot, on_delete=models.CASCADE)
    member = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    reason = models.TextField()
    completed = models.BooleanField(default=False)
    booked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Appointment'
        verbose_name_plural = 'Appointments'



