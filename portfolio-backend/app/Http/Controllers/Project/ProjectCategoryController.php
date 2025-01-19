<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\ProjectCategoryRequest;
use App\Repositories\ProjectCategoryInterface;
use Illuminate\Http\Request;

class ProjectCategoryController extends Controller
{

    public function __construct(public ProjectCategoryInterface $projectCategoryInterface)
    {
        $this->projectCategoryInterface = $projectCategoryInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $project_categories = $this->projectCategoryInterface->getProjectCategory();

       return response()->json([
           "project_categories" => $project_categories
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
    public function store(ProjectCategoryRequest $request)
    {

        try {
            

            $project_category = $this->projectCategoryInterface->postProjectCategory($request->all());

            return response()->json([
                "data" => $project_category,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $th->getMessage(),
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
        try {
            $project_category = $this->projectCategoryInterface->editProjectCategory($this->projectCategoryInterface->projectCategory->find($id));
            $project_category->update($request->all());
            return response()->json([
                "data" => $project_category,
            ], 200);

        } catch (\Throwable $th) {
            
            return response()->json([
                "message" => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project_category = $this->projectCategoryInterface->editProjectCategory($this->projectCategoryInterface->projectCategory->find($id));

        $this->projectCategoryInterface->deleteProjectCategory($project_category);
        return response()->json([
            "message" => "Project Category deleted successfully",
        ],  200);
    }
}
