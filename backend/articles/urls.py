from django.urls import path
from . import views

urlpatterns = [
    path('create-article/', views.CreateArticle.as_view(), name='create-article'),
    path('get-articles/', views.ArticleList.as_view(), name='article-list'),
    path('delete-article/<int:pk>/', views.DeleteArticleView.as_view(), name='delete-article'),
    path('update-article/<int:pk>/', views.UpdateArticleView.as_view(), name='update-article'),
]