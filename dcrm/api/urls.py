from django.urls import path
from .views import userView

urlpatterns = [
    path('user/register', userView.as_view(),name='register'),
]
