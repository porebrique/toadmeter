from rest_framework import permissions

class DemoUserPermission(permissions.BasePermission):
    """
    Check if user are demo user with no right to write
    """

    def has_permission(self, request, view):
#        return True # for filling demo data
        perm = True
        if not request.method in permissions.SAFE_METHODS:
            isDemo = request.user.groups.filter(pk=1)
            if isDemo:
                perm = False
        return perm