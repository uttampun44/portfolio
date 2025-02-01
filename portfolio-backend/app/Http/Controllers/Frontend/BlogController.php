<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Blog\Post;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function posts()
    {
        return response()->json([
            'posts' => Post::select('id', 'title', 'mini_title', 'tags', 'image', 'content')->get(),
        ], 200);
    }
}
