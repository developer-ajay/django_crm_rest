from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('classView/', views.classView.as_view()),
    path('', views.home , name='home'),
]
