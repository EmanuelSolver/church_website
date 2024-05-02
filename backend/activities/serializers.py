from rest_framework import serializers
from .models import Department, Event, JoinedDepartment, Sermon, Image
from accounts.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']  


class DepartmentSerializer(serializers.ModelSerializer):
    leader_name = serializers.CharField(source='leader.username')

    class Meta:
        model = Department
        fields = ['id', 'title', 'leader_name', 'description', 'date']


class JoinedDepartmentSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = JoinedDepartment
        fields = ['id', 'user', 'department', 'date']
        read_only_fields = ['id', 'date']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'day', 'time', 'venue']



class SermonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sermon
        fields = ['id', 'title', 'speaker', 'link', 'quote']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'link', 'description']

