<?php

namespace App\Repositories;
use App\Models\Blog\Post;

interface PostInterface
{
    public function getPosts();

    public function postPosts(array $data):Post;

    public function editPosts(Post $post):Post;

    public function updatePosts(Post $post, array $data):bool;    

    public function deletePosts(Post $post);
}