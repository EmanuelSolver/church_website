from django.db import models
    
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
