<?php

namespace Yago\Cms\Providers;

use Illuminate\Support\ServiceProvider;

class CmsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__ . '/../../routes/web.php');
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'yago-cms');

        $this->publishes([
            __DIR__ . '/../../resources/css' => public_path('vendor/cms/css'),
            __DIR__ . '/../../resources/js' => public_path('vendor/cms/js'),
        ], 'public');
    }
}
