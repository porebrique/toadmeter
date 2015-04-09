from django.db import models
from django.contrib.auth.models import User

TRANSACTION_TYPES = (
    ('in', 'income'),
    ('out', 'cost')
)

class Tag(models.Model):
    owner = models.ForeignKey(User)
    text = models.CharField(max_length=100)
    inevitable = models.BooleanField(default=False)
    type = models.CharField(max_length=3, choices=TRANSACTION_TYPES)
    
    def __unicode__(self):
        return self.text
    
class Transaction(models.Model):
    owner = models.ForeignKey(User)
    tag = models.ForeignKey(Tag)
    type = models.CharField(max_length=3, choices=TRANSACTION_TYPES)
    date = models.DateField(auto_now_add=True)
    size = models.PositiveIntegerField()
    
    def __unicode__(self):
        return '%s: %s' % (self.tag.text, self.size)
    
    