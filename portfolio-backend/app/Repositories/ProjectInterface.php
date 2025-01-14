<?php

namespace App\Repositories;

use App\Models\Project;

interface ProjectInterface{

    public function getProjects();

    public function postProjects(array $data):Project;

    public function editProjects(Project $project):Project;

    public function updateProjects(Project $project, array $data):bool;
    
    public function deleteProjects(Project $project);
}