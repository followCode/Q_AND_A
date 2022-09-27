from django.db import models
from django.contrib.auth.models import User


# We implement a Base Model here as PyCharm is not able to autocomplete
# TODO: Need to find alternative approach without requiring to create
#       such abstractions.
class BaseModel(models.Model):
    objects = models.Manager()

    class Meta:
        abstract = True


class Question(BaseModel):
    text = models.CharField(max_length=250)
    pub_date = models.DateTimeField('date published')
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Comment(BaseModel):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
