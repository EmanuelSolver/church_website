from django.urls import path
from . import views

urlpatterns = [
    path('create-department/', views.CreateDepartment.as_view(), name='create-department'),
    path('departments/', views.DepartmentList.as_view(), name='department-list'),
    path('join-department/<int:user_id>/<int:dept_id>/', views.JoinDepartment.as_view(), name='join-department'),
    path('delete-department/<int:pk>', views.DeleteDepartmentView.as_view(), name='delete-department'),

    path('create-event/', views.CreateEvent.as_view(), name='create-event'),
    path('events/', views.EventList.as_view(), name='event-list'),
    path('delete-event/<int:pk>/', views.DeleteEventView.as_view(), name='delete-event'),
    path('update-event/<int:pk>/', views.UpdateEventView.as_view(), name='update-event'),

    path('create-sermon/', views.CreateSermon.as_view(), name='create-sermon'),
    path('sermons/', views.SermonListCreateAPIView.as_view(), name='sermon-list-create'),
    path('delete-sermon/<int:pk>/', views.DeleteSermonView.as_view(), name='delete-sermon'),

    
    path('create-image/', views.CreateImage.as_view(), name='create-image'),
    path('images/', views.ImageListCreateAPIView.as_view(), name='image-list-create'),
    path('delete-image/<int:pk>/', views.DeleteImageView.as_view(), name='delete-image'),


]
