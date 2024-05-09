from rest_framework import serializers
from .models import Event, ExternalForm

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'day', 'time', 'venue']
        
class ExternalFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalForm
        fields = ['id', 'title', 'form_link', 'deadline']