from django.urls import path
from .views import *

urlpatterns = [
    path('appointment-slots/', AppointmentSlotsList.as_view(), name='appointment-slots-list'),
    path('appointments/', BookAppointmentList.as_view(), name='book-appointment-list'),
    path('create-slot/', CreateAppointmentSlotView.as_view(), name='create_slot'),
    path('book-slot/', BookSlotView.as_view(), name='book-slot'),
    path('approve-slot/<int:pk>/', ApproveSlotView.as_view(), name='approve-slot'),
    path('delete-slot/<int:pk>/', DeleteSlotView.as_view(), name='delete-slot'),
]
