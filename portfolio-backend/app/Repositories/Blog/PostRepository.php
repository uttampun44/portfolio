<?php

namespace App\Repositories\Blog;

use App\Models\Blog\Post;
use App\Repositories\PostInterface;
use Illuminate\Http\UploadedFile;


class PostRepository implements PostInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(public Post $post)
    {
        //
    }

    public function getPosts()
    {
        return $this->post->all();
    }

    public function postPosts(array $data): Post
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {

            $data['image'] = $data['image']->store('images', 'public');
         }

         
        return $this->post->create($data);
    }

    public function editPosts(Post $post): Post
    {
        return $post;
    }

    public function updatePosts(Post $post, array $data): bool
    {
        return $post->update($data);
    }

    public function deletePosts(Post $post)
    {
        return $post->delete();
    }
}
