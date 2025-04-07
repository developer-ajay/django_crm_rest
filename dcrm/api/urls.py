from django.urls import path
from .views import userCreateView,RecordListView,RecordRetieveUpdateDeleteView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('user/register', userCreateView.as_view(),name='register'),
    path('auth/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('records/', RecordListView.as_view(),name='register_record'),
    path('record/<int:pk>/', RecordRetieveUpdateDeleteView.as_view(),name='record_detail'),
]
