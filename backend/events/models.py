from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=100)
    day = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
    
class ExternalForm(models.Model):
    title = models.CharField(max_length=100)
    form_link = models.URLField()
    deadline = models.DateField()

    def __str__(self):
        return self.title