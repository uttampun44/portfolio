<?php

namespace App\Repositories;

use App\Models\ProjectCategory;

interface ProjectCategoryInterface
{
    public function getProjectCategory();

    public function postProjectCategory(array $data): ProjectCategory;

    public function editProjectCategory(ProjectCategory $projectCategory): ProjectCategory;

    public function updateProjectCategory(ProjectCategory $projectCategory, array $data): bool;

    public function deleteProjectCategory(ProjectCategory $projectCategory);
}