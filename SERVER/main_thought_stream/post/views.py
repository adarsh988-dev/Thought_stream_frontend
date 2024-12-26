from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer,CommentSerializer


# Create your views here.
class PostView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        pass
        

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided or are invalid.'},
                            status=status.HTTP_401_UNAUTHORIZED)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CommentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided or are invalid.'},
                            status=status.HTTP_401_UNAUTHORIZED)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
