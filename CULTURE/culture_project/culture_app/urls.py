from django.urls import path
from culture_app import views

urlpatterns = [
    path('', views.home, name='home'),
    path('post-comment/', views.post_comment, name='post_comment'),
    path('comments/', views.comments_page, name='comments_page'),
    path('contact/', views.contact, name='contact'),
    path('cuisine/', views.cuisine, name='cuisine'),
    path('festivals/', views.festivals, name='festivals'),
    path('art-craft/', views.art_craft, name='art-craft'),
    path('music-dance/', views.music_dance, name='music-dance'),
    path('culture/', views.culture_page, name='culture_page'),
]
