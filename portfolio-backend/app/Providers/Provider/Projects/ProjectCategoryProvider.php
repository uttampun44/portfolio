<?php

namespace App\Providers\Provider\Projects;

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
        $this->app->bind(ProjectCategoryInterface::class, ProjectCategoryRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
