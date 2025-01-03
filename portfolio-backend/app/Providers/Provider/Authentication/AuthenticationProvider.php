<?php

namespace App\Providers\Provider\Authentication;

use App\Repositories\Authentication\AuthenticationRepository;
use App\Repositories\AuthenticationInterface;
use Illuminate\Support\ServiceProvider;

class AuthenticationProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthenticationInterface::class, AuthenticationRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
