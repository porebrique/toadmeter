import django_filters
from rest_framework import serializers, viewsets, filters, decorators, response, permissions
from django.contrib.auth.models import User
from time import sleep


class UserSerializer(serializers.ModelSerializer):
#    name = serializers.SerializerMethodField()
    class Meta:
#        model = CustomUser
        model = User
        fields = ('id', 'username','is_staff', 'first_name', 'last_name')
        


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
#    filter_fields = ('is_staff', 'id', 'type')
    filter_fields = ('username',)
#    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        if not self.request.user.is_superuser:
            self.queryset = self.queryset.filter(id=self.request.user.id)
        return self.queryset            
    
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
    