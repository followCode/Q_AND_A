from typing import Union

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Question, Comment
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, QuestionsSerializer, AddQuestionsSerializer, \
    CommentsSerializer, AddCommentsSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class QuestionsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        questions = Question.objects.all()
        serializer = QuestionsSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AddQuestionsSerializer(data=request.data)
        if serializer.is_valid():
            saved_question = serializer.save(user=request.user)
            output_serializer = QuestionsSerializer(saved_question, many=False)
            return Response(output_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        comments = Comment.objects.filter(question__pk=request.query_params.get('question_id', None))
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AddCommentsSerializer(data=request.data)
        if serializer.is_valid():
            saved_comment = serializer.save(user=request.user)
            output_serializer = AddCommentsSerializer(saved_comment, many=False)
            return Response(output_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/questions/',
        '/api/comments/'
    ]
    return Response(routes)
