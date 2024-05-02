from django.db import models
from accounts.models import CustomUser

class Department(models.Model):
    title = models.CharField(max_length=100)
    leader = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class JoinedDepartment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)


class Event(models.Model):
    title = models.CharField(max_length=100)
    day = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    


class Sermon(models.Model):
    title = models.CharField(max_length=100)
    speaker = models.CharField(max_length=50)
    link = models.URLField()
    quote = models.TextField()

    def __str__(self):
        return self.quote[:50]  # Display first 50 characters of description


class Image(models.Model):
    link = models.URLField()
    description = models.TextField()

    def __str__(self):
        return self.description[:50]  # Display first 50 characters of description
