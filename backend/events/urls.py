from django.urls import path
from . import views

urlpatterns = [
    path('create-event/', views.CreateEvent.as_view(), name='create-event'),
    path('events/', views.EventList.as_view(), name='event-list'),
    path('delete-event/<int:pk>/', views.DeleteEventView.as_view(), name='delete-event'),
    path('update-event/<int:pk>/', views.UpdateEventView.as_view(), name='update-event'),
]