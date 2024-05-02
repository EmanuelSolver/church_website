from rest_framework.authentication import BaseAuthentication

class UnauthenticatedAccessAuthentication(BaseAuthentication):
    """
    Allow unauthenticated access to views.
    """
    def authenticate(self, request):
        # Return None to indicate that no authentication credentials were provided
        return None
