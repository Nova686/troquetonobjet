<?php

namespace App\Providers;

use App\Library\GooglePlace\IGooglePlaceService;
use App\Library\GooglePlace\GooglePlaceService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->scoped(IGooglePlaceService::class, GooglePlaceService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
