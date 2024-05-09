from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Department, JoinedDepartment
from accounts.models import CustomUser
from .serializers import CreateDepartmentSerializer, DepartmentSerializer, JoinedDepartmentSerializer


class CreateDepartment(APIView):
    def post(self, request, format=None):
        serializer = CreateDepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentList(APIView):
    def get(self, request, format=None):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)


class DeleteDepartmentView(generics.DestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class JoinDepartment(APIView):
    def post(self, request, user_id, dept_id):
        # Get the user and department objects or return 404 if not found
        user = get_object_or_404(CustomUser, id=user_id)
        department = get_object_or_404(Department, id=dept_id)

        # Create a JoinedDepartment instance
        joined_department = JoinedDepartment.objects.create(user=user, department=department)

        # Optionally, you can serialize the instance and return it in the response
        joined_department_serializer = JoinedDepartmentSerializer(joined_department)
        return Response(joined_department_serializer.data, status=status.HTTP_201_CREATED)

