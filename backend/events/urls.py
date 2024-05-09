from django.urls import path
from . import views

urlpatterns = [
    path('create-event/', views.CreateEvent.as_view(), name='create-event'),
    path('events/', views.EventList.as_view(), name='event-list'),
    path('delete-event/<int:pk>/', views.DeleteEventView.as_view(), name='delete-event'),
    path('update-event/<int:pk>/', views.UpdateEventView.as_view(), name='update-event'),
    
    path('upload-external-form/', views.CreateExternalForm.as_view(), name='create-external-form'),
    path('external-forms/', views.ExternalFormList.as_view(), name='external-form-list'),
    path('delete-external-form/<int:pk>/', views.DeleteExternalFormView.as_view(), name='delete-external-form'),
]