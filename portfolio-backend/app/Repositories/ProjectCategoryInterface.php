<?php

namespace App\Repositories;

use App\Models\ProjectCategory;
use Illuminate\Database\Eloquent\Collection;

interface ProjectCategoryInterface
{
    public function getProjectCategory(): Collection;

    public function postProjectCategory(array $data): ProjectCategory;

    public function editProjectCategory(ProjectCategory $projectCategory): ProjectCategory;

    public function updateProjectCategory(ProjectCategory $projectCategory, array $data): bool;

    public function deleteProjectCategory(ProjectCategory $projectCategory);
}