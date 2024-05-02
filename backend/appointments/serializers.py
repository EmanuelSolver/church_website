from rest_framework import serializers
from .models import AppointmentSlot, Appointments
from accounts.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']  
        
        
class AppointmentSlotsSerializer(serializers.ModelSerializer):
    pastor_name = serializers.CharField(source='pastor.username')
    class Meta:
        model = AppointmentSlot
        fields = ['id','pastor','day', 'start_time', 'end_time', 'pastor_name',  'status']        

class AppointmentsSerializer(serializers.ModelSerializer):
    slot_day = serializers.DateField(source='slot.day')
    slot_startTime = serializers.TimeField(source='slot.start_time')
    slot_endTime = serializers.TimeField(source='slot.end_time')
    pastor_username = serializers.CharField(source='slot.pastor.username')
    pastor_id = serializers.CharField(source='slot.pastor.id')

    slot_status = serializers.CharField(source='slot.status')
    member_username = serializers.CharField(source='member.username')

    class Meta:
        model = Appointments
        fields = ['pastor_id','slot_id','slot_day', 'slot_startTime', 'slot_endTime', 'member_username', 'pastor_username', 'reason', 'slot_status', 'completed', 'booked_at']