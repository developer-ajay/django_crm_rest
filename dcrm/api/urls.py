from django.urls import path
from .views import userCreateView,RecordListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('user/register', userCreateView.as_view(),name='register'),
    path('auth/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('record/register', RecordListView.as_view(),name='register_record')
]
