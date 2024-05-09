from rest_framework import generics
from .models import AppointmentSlot, Appointments
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class CreateAppointmentSlotView(APIView):
    def post(self, request):
        serializer = CreateSlotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookSlotView(APIView):
    def post(self, request):
        slot_id = request.data.get('slotId')
        member = request.data.get('member')  # Assuming 'member' is passed in the request data
        reason = request.data.get('reason')

        # Update AppointmentSlot status to 'Booked'
        try:
            slot = AppointmentSlot.objects.get(id=slot_id)
            slot.status = 'Booked'
            slot.save()
        except AppointmentSlot.DoesNotExist:
            return Response({'error': 'Appointment slot not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create BookAppointment object
        book_appointment_data = {
            'member': member,
            'reason': reason,
        }
        book_appointment_serializer = AppointmentsSerializer(data=book_appointment_data)
        if book_appointment_serializer.is_valid():
            book_appointment_serializer.save()
            return Response(book_appointment_serializer.data, status=status.HTTP_201_CREATED)


class ApproveSlotView(generics.UpdateAPIView):
    queryset = AppointmentSlot.objects.all()
    serializer_class = AppointmentSlotsSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 'Approved'
        instance.save()
        return Response(status=status.HTTP_200_OK)


class AppointmentSlotsList(generics.ListCreateAPIView):
    queryset = AppointmentSlot.objects.all()
    serializer_class = AppointmentSlotsSerializer


class BookAppointmentList(generics.ListCreateAPIView):
    queryset = Appointments.objects.all()
    serializer_class = AppointmentsSerializer

    def get_queryset(self):
        return self.queryset.select_related('slot').prefetch_related('slot__pastor')  # Include related data from AppointmentSlot model and pastor field


class DeleteSlotView(generics.DestroyAPIView):
    queryset = AppointmentSlot.objects.all()
    serializer_class = AppointmentSlotsSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
