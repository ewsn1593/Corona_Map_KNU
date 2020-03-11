from django.db import models

# Create your models here.

class Building(models.Model):
    name = models.CharField(max_length = 20)
    confirm = models.IntegerField(blank = True)
    suspicious = models.BooleanField(blank=True)
    protection = models.CharField(max_length = 20)
    status = models.CharField(max_length = 20, blank=True)
    text = models.TextField(blank=True)
    longitude = models.FloatField(blank=False)
    latitude = models.FloatField(blank=False)

    def __str__(self):
        return self.name

class School_Find(models.Model):
    schoolteacher = models.IntegerField(blank = False)
    postg = models.IntegerField(blank = False)
    underg = models.IntegerField(blank = False)
    employee = models.IntegerField(blank = False)
    date = models.DateField(blank=False)

class Info(models.Model):
    text = models.TextField(blank=True)

class Chinese_student(models.Model):
    date = models.DateField(blank = False)
    num = models.IntegerField(blank = False)

class QuarantinePPl(models.Model):
    date = models.DateField(blank = False)
    num = models.IntegerField(blank = False)
    inPpl = models.IntegerField(blank = False)
    outPpl = models.IntegerField(blank = False)
    toHos = models.IntegerField(blank= False)

class Pbuil(models.Model):
    name = models.CharField(max_length=20)
    date = models.CharField(max_length = 20)
    longitude = models.FloatField(blank=False)
    latitude = models.FloatField(blank=False)
