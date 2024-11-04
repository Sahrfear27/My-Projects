from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    # Override the username django create : we want to login with our own username and password
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
