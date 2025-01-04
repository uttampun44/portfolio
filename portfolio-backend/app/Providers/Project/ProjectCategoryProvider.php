<?php

namespace App\Providers\Project;

use App\Repositories\ProjectCategoryInterface;
use App\Repositories\Projects\ProjectCategoryRepository;
use Illuminate\Support\ServiceProvider;

class ProjectCategoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(ProjectCategoryRepository::class, ProjectCategoryInterface::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
