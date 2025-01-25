<?php

namespace App\Providers\Contactme;

use App\Repositories\Contactme\ContactMeRepository;
use App\Repositories\ContactMeInterface;
use Illuminate\Support\ServiceProvider;

class ContactMeProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(ContactMeInterface::class, ContactMeRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
