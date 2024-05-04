from rest_framework import serializers
from .models import Sermon, Image


class SermonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sermon
        fields = ['id', 'title', 'speaker', 'link', 'quote']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'link', 'description']

