<?php

namespace App\Repositories\Projects;

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Repositories\ProjectInterface;


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
        $projects = Project::with(['projectCategory' => function ($query) {
                                          $query->select('id', 'name');
                             }])->select('id', 'name', 'image', 'link', 'project_category_id')->get();

        return response()->json([
            'project_categories' => $project_categories,
            'projects' => $projects,
        ], 200);
    }

    public function postProjects(array $data): Project
    {

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
