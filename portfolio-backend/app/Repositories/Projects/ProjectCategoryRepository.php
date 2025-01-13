<?php

namespace App\Repositories\Projects;

use App\Models\ProjectCategory;
use App\Repositories\ProjectCategoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ProjectCategoryRepository implements ProjectCategoryInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(public ProjectCategory $projectCategory)
    {
        //
    }

    public function getProjectCategory()
    {
        return ProjectCategory::select('id', 'name')->get();
    }

    public function postProjectCategory(array $data): ProjectCategory
    {
        return ProjectCategory::create($data);
    }

    public function editProjectCategory(ProjectCategory $projectCategory): ProjectCategory
    {
        return $projectCategory;
    }

    public function updateProjectCategory(ProjectCategory $projectCategory, array $data):bool
    {
        return $projectCategory->update($data);
    }

    public function deleteProjectCategory(ProjectCategory $projectCategory)
    {
       return $projectCategory->delete();
    }
}
