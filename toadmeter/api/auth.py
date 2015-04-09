from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout
from toadmeter.libs.decorators import json_view
import json

from toadmeter.api.users import UserSerializer

from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest

@json_view
def logout_view(request):
    logout(request)
    return 'Logged out.'

#@json_view
@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username', None)
    password = data.get('password', None)
    if username and password:
        user = authenticate(username=username, password=password)
#        print 'user is',  user
        if user is not None:
            if user.is_active:
                login(request, user)
                jsonDict = {'user': UserSerializer(user).data}
                return HttpResponse(json.dumps(jsonDict), content_type="application/json" )
            else:
                pass
                # Return a 'disabled account' error message
        else:
            return HttpResponseForbidden(json.dumps('Wrong login/password combination'), content_type="application/json" )
    else:
        return HttpResponseBadRequest(json.dumps('No login or password'), content_type="application/json" )