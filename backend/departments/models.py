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