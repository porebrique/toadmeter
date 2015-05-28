import django_filters
from rest_framework import serializers, viewsets, filters, decorators, response
from django.contrib.auth.models import User
from time import sleep


class UserSerializer(serializers.ModelSerializer):
#    name = serializers.SerializerMethodField()
    class Meta:
#        model = CustomUser
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'first_name', 'last_name')
        
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
#    filter_fields = ('is_staff', 'id', 'type')
    filter_fields = ('username',)
    
    @decorators.list_route(methods=['get'])
    def check(self, request, filename=None, format=None, pk=None):
        username = request.GET.get('username', None)
        users = User.objects.filter(username=username)
#        print 'got request for username', username
#        if users:
#            print 'got some users'
#        else:
#            print 'no users'
        
        return response.Response(users.count())    
    