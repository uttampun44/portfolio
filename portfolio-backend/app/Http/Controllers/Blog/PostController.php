<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\PostRequest;
use App\Models\Blog\BlogCategory;
use App\Models\Blog\Post;
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'posts' => Post::select('id', 'title', 'semin_title', 'content', 'image', 'blog_category_id')->get(),
            'blog_categories' => BlogCategory::select('id', 'name')->get(),
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

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
                'mini_title' => $request->mini_title,
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
        return response()->json([
            'post' => Post::find($id),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {

            $post = Post::find($id);

            $image = $post->image;

            if ($request->hasFile('image')) {

                $newImage = $request->file('image')->store('images', 'public');


                if ($image) {
                    Storage::disk('public')->delete($image);
                }

                $image = $newImage;
            }

            if (!$request->has('title') || empty($request->title)) {
                throw new \Exception("The title field is required and cannot be null.");
            }

            if (!$request->has('content') || empty($request->content)) {
                throw new \Exception("The content field is required and cannot be null.");
            }

            if (!$request->has('blog_category_id') || empty($request->blog_category_id)) {
                throw new \Exception("The blog_category_id field is required and cannot be null.");
            }


            $post->update([
                'title' => $request->title,
                'mini_title' => $request->mini_title,
                'tags' => $request->tags,
                'image' => $image,
                'content' => $request->content,
                'blog_category_id' => $request->blog_category_id,
            ]);

            return response()->json([
                'data' => $post,
            ], 200);
        } catch (\Throwable $th) {
            Log::error("error while updating blog: " . $th->getMessage());
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $posts = Post::find($id);
        if ($posts) {
            $posts->delete();
        }
        return response()->json([
            'message' => 'Post deleted successfully',
        ], 200);
    }
}
