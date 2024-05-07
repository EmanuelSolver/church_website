from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Article
from accounts.models import CustomUser
from .serializers import  ArticleSerializer
from rest_framework.generics import UpdateAPIView
import bleach

class CreateArticle(APIView):
    def post(self, request, format=None):
        request.data['content'] = bleach.clean(request.data['content'], tags=[], attributes={}, strip=True)
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArticleList(APIView):
    def get(self, request, format=None):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        data = serializer.data

        # Fetching and adding the writer's username to each article
        for article in data:
            writer_id = article['writer']
            writer_username = CustomUser.objects.get(pk=writer_id).first_name  # Assuming CustomUser is your model
            article['writer_name'] = writer_username

        return Response(data)


class UpdateArticleView(UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)



class DeleteArticleView(generics.DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
