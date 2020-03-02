
# Create your views here.
from django.shortcuts import render, redirect
from .models import *
from django.forms.models import model_to_dict
import json
# Create your views here.
def index(request):
  buil_list = []
  buildings = Building.objects.all()
  for building in buildings:
    buil_dict = model_to_dict(building)
    buil_list.append(buil_dict)
  return render(request, 'main/index.html', {'buil_list':buil_list})