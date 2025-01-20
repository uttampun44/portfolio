<?php

namespace App\Repositories\Projects;

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Repositories\ProjectInterface;
use Illuminate\Http\UploadedFile;

class ProjectRepository implements ProjectInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(public Project $project)
    {
        //
    }

    public function getProjects()
    {
        $project_categories = ProjectCategory::select('id', 'name')->get();
        return response()->json([
            'project_categories' => $project_categories,
        ], 200);
    }

    public function postProjects(array $data): Project
    {
      
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {

           $data['image'] = $data['image']->store('images', 'public');
        }

        return $this->project->create($data);
    }

    public function editProjects(Project $project): Project
    {
        return $project;
    }

    public function updateProjects(Project $project, array $data): bool
    {
        return $project->update($data);
    }

    public function deleteProjects(Project $project)
    {
        return $project->delete();
    }
}
