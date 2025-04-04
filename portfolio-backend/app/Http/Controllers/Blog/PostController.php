<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\PostRequest;
use App\Models\Blog\BlogCategory;
use App\Models\Blog\Post;
use App\Repositories\PostInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(public PostInterface $postInterface)
    {
        $this->postInterface = $postInterface;
    }

    public function index()
    {
        return response()->json([
            'posts' => Post::with(['blog_category' => function ($query) {
                $query->select('id', 'name');
            }])->select('id', 'title', 'mini_title', 'tags', 'content', 'image', 'blog_category_id')->get(),
            
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

            if($request->hasFile('image')){
                $image = $request->file('image')->store('images', 'public');
            }

            Post::create([
                'title' => $request->title,
                'mini_title' => $request->mini_title,
                'tags' => $request->tags,
                'content' => $request->content,
                'blog_category_id' => $request->blog_category_id,
                'image' => $image,
            ]);

            return response()->json([
                'message' => 'Post created successfully',
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
        return $this->postInterface->editPosts($this->postInterface->getPosts()->find($id));
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        try {

            $post = Post::find($id);

            $image = $post->image;

            
        
            if ($request->hasFile('image')) {
                
                
                $oldImagePath = 'public/' . $post->image;
                
           
                if (Storage::exists($oldImagePath)) {
                    Storage::delete($oldImagePath);
                }
    
             
                $newImage = $request->file('image')->store('images', 'public');

                Log::info($newImage);
                $image = $newImage; 
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
       $data = $this->postInterface->deletePosts($this->postInterface->getPosts()->find($id));

       if ($data) {
           return response()->json([
               'message' => 'Post deleted successfully',
           ], 200);
       } else {
           return response()->json([
               'message' => 'Post not found',
           ], 404);
       }
    }
}
