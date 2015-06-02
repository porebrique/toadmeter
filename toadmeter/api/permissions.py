from rest_framework import permissions

class DemoUserPermission(permissions.BasePermission):
    """
    Check if user are demo user with no right to write
    """

    def has_permission(self, request, view):
        perm = True
#        print 'unsafe', not request.method in permissions.SAFE_METHODS
        if not request.method in permissions.SAFE_METHODS:
            isDemo = request.user.groups.filter(pk=1)
#            print 'isDemo:', isDemo
            if isDemo:
#                print 'this is demo user!'
                perm = False
#        print 'User is', request.user, ', permitted: ', perm
        return perm