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
    Faculty = models.IntegerField(blank = False)
    postg = models.IntegerField(blank = False)
    underg = models.IntegerField(blank = False)

class Info(models.Model):
    text = models.TextField(blank=True)

class Chinese_student(models.Model):
    date = models.DateField(blank = False)
    num = models.IntegerField(blank = False)

