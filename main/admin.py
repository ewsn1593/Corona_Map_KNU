from django.contrib import admin
from .models import *

# Register your models here.
class Building_Admin(admin.ModelAdmin):
    list_display = ['name', 'confirm', 'suspicious', 'protection', 'status', 'text', 'longitude', 'latitude']
    ordering = ['-name']
    list_editable = ['confirm', 'suspicious', 'protection', 'status', 'text']

class School_Find_Admin(admin.ModelAdmin):
    list_display = ['schoolteacher','employee', 'postg', 'underg','date']
    list_editable = ['postg','underg','employee','date']

class Info_Admin(admin.ModelAdmin):
    list_display = ['text']


class Chinese_student_Admin(admin.ModelAdmin):
    list_display = ['date', 'num']

class QuarantinePPl_Admin(admin.ModelAdmin):
    list_display = ['date', 'num', 'inPpl', 'outPpl','toHos']
    list_editable = ['num', 'inPpl', 'outPpl','toHos']


admin.site.register(Building, Building_Admin)
admin.site.register(School_Find, School_Find_Admin)
admin.site.register(Info)
admin.site.register(Chinese_student)
admin.site.register(QuarantinePPl,QuarantinePPl_Admin)