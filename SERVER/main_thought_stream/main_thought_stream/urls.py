from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel route
    path('user/', include('user.urls'))
]
