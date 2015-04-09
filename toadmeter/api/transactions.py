import django_filters
from rest_framework import serializers, viewsets, filters

from time import sleep

from django.contrib.auth.models import User
from toadmeter.transactions.models import Transaction, Tag

class TagSerializer(serializers.ModelSerializer):
#    name = serializers.SerializerMethodField()
    class Meta:
        model = Tag
        fields = ('id', 'text', 'owner', 'type', 'inevitable')
        
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
#    filter_backends = (filters.DjangoFilterBackend,)
#    filter_fields = ('is_staff', 'id', 'type')
    
    
class TransactionSerializer(serializers.ModelSerializer):
#    name = serializers.SerializerMethodField()
    class Meta:
        model = Transaction
        fields = ('id', 'size', 'owner', 'date', 'type', 'tag')
        
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('type',)    