from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    data = [
        {"id": 1, "title": "Bently"},
        {"id": 2, "title": "Mercedez"},
        {"id": 3, "title": "Toyota"},
    ]
    return JsonResponse(data, safe=False)
