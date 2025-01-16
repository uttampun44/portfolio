<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\BlogCategoryRequest;
use App\Models\Blog\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = BlogCategory::select('id', 'name')->get();
         
        return response()->json([
            'data' => $blogs,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogCategoryRequest $request)
    {
        try {
            $blog = BlogCategory::create([
                'name' => $request->name,
            ]);
            return response()->json([
                'data' => $blog,
            ], 201);
        } catch (\Throwable $th) {
            Log::error("error while creating blog category: " . $th->getMessage());
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
        $editBlog = BlogCategory::find($id);
        return response()->json([
            'data' => $editBlog,
        ], 200);    
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogCategoryRequest $request, string $id)
    {
       try {
             $blog_category_update = BlogCategory::updated([
                     'name' => $request->name
                           ]);

              return response()->json([
                'data' => $blog_category_update
              ], 201);             

       } catch (\Throwable $th) {
         
        Log::error("error while creating blog category: " . $th->getMessage());
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
        //
    }
}
