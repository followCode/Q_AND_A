from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.models import Question, Comment


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token


class QuestionsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    user_name = serializers.CharField(source='user.username')

    class Meta:
        model = Question
        fields = ('id', 'text', 'pub_date', 'user_name')


class AddQuestionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('text', 'pub_date')


class CommentsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    user_name = serializers.CharField(source='user.username')

    class Meta:
        model = Comment
        fields = ('id', 'text', 'user_name')


class AddCommentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('question', 'text')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
