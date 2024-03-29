from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('questions/', views.QuestionsView.as_view(), name='questions'),
    path('comments/', views.CommentsView.as_view(), name='comments'),
    path('similar-questions/', views.SimilarQuestionsView.as_view(), name='similar-questions'),
    path('', views.get_routes)
]