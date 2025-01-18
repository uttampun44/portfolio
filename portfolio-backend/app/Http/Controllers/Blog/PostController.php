<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\PostRequest;
use App\Models\Blog\BlogCategory;
use App\Models\Blog\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return response()->json([
            'posts' => Post::select('id', 'title', 'content', 'image', 'blog_category_id')->get(),
            'blog_categories' => BlogCategory::select('id', 'name')->get(),
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        try {

            $image = null;

            if ($request->hasFile('image')) {
               $image =  $request->image->storeAs('image', 'public');
            }

            $blogs = Post::create([
                'title' => $request->title,
                'mini-title' => $request->mini_title,
                'content' => $request->content,
                'tags' => $request->tags,
                'image' => $image,
                'blog_category_id' => $request->blog_category_id,
            ]);
            return response()->json([
                'data' => $blogs,
            ], 201);
        } catch (\Throwable $th) {
            Log::error("error while creating blog: " . $th->getMessage());
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
