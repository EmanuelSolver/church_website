from django.urls import path
from . import views

urlpatterns = [

    path('create-sermon/', views.CreateSermon.as_view(), name='create-sermon'),
    path('sermons/', views.SermonListCreateAPIView.as_view(), name='sermon-list-create'),
    path('delete-sermon/<int:pk>/', views.DeleteSermonView.as_view(), name='delete-sermon'),

    
    path('create-image/', views.CreateImage.as_view(), name='create-image'),
    path('images/', views.ImageListCreateAPIView.as_view(), name='image-list-create'),
    path('delete-image/<int:pk>/', views.DeleteImageView.as_view(), name='delete-image'),


]
