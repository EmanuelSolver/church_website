from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=100)
    day = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=100)

    def __str__(self):
        return self.title