<?php

namespace App\Providers;

use App\Library\GooglePlace\IGooglePlaceService;
use App\Library\GooglePlace\GooglePlaceService;
use App\Library\Storage\StorageService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->scoped(IGooglePlaceService::class, GooglePlaceService::class);
        $this->app->singleton(StorageService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
