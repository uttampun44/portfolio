<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\ProjectRequest;
use App\Models\Project;
use App\Repositories\ProjectInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function __construct(public ProjectInterface $projectInterface)
    {
        $this->projectInterface = $projectInterface;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->projectInterface->getProjects();
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
    public function store(ProjectRequest $request)
    {

    
        Log::info("project store");

        try {

           $image = null;

           if($request->hasFile('image')){
               $image = $request->file('image')->storeAs('images', 'public');
           }

        return response()->json([
               'name' => $request->name,
               'image' => $image,
               'link' => $request->link,
               'project_category_id' => $request->project_category_id,
           ], 201);

        } catch (\Throwable $th) {
            
            Log::error("error" . $th->getMessage());
            return response()->json(['error' => $th->getMessage()], 500);
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
        //code...
       } catch (\Throwable $th) {
        //throw $th;
       }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $projects = $this->projectInterface->editProjects($this->projectInterface->project->find($id));

         $this->projectInterface->deleteProjects($projects);

         return response()->json([
             "message" => "Project deleted successfully",
         ], 200);
    }
}
