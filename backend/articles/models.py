from django.db import models
from accounts.models import CustomUser

class Article(models.Model):
    writer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)