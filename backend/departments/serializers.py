from rest_framework import serializers
from .models import Department, JoinedDepartment

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

