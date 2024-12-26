from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'image','created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at'] 

    def create(self, validate_data):
        user = self.context['request'].user  
        validate_data['author'] = user  
        return super().create(validate_data)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment

