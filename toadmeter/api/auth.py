from django.views.decorators.csrf import csrf_exempt

from django.db import IntegrityError

from django.contrib import auth 
from django.contrib.auth.models import User
from toadmeter.libs.decorators import json_view
import json

from toadmeter.api.users import UserSerializer

#from rest_framework import status
#from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest

def reg_view(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    try:
        user = User.objects.create_user(username, None, password)
    except IntegrityError as error:
        return HttpResponseBadRequest(json.dumps('Username "%s" is not available' % username), content_type="application/json" )
    return HttpResponse(json.dumps('user created'), content_type="application/json" )    

@json_view
def logout_view(request):
    auth.logout(request)
    return 'Logged out.'

#@json_view
@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username', None)
    password = data.get('password', None)
    remember = data.get('remember', None)
#    print 'session is', request.session
    
    if username and password:
        user = auth.authenticate(username=username, password=password)
#        print 'remember is', remember
        if not remember:
            request.session.set_expiry(0)
#            print 'session will die at browser closing'
            
#        print 'user is',  user
        if user is not None:
            if user.is_active:
                auth.login(request, user)
                jsonDict = {'user': UserSerializer(user).data}
                return HttpResponse(json.dumps(jsonDict), content_type="application/json" )
            else:
                pass
                # Return a 'disabled account' error message
        else:
            return HttpResponseForbidden(json.dumps('Wrong login/password combination'), content_type="application/json" )
    else:
        return HttpResponseBadRequest(json.dumps('No login or password'), content_type="application/json" )