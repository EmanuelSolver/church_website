from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    writer_name = serializers.CharField(source='writer.first_name', read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'created_on', 'writer', 'writer_name']
