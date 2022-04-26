<?php

namespace Yago\OpeningHours\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Yago\Cms\Services\ModuleService;
use Yago\OpeningHours\Http\Controllers\OpeningHoursController;

class OpeningHoursServiceProvider extends ServiceProvider
{
    public function register()
    {
        // GraphQL
        $dispatcher = app(\Illuminate\Contracts\Events\Dispatcher::class);
        $dispatcher->listen(
            \Nuwave\Lighthouse\Events\BuildSchemaString::class,
            function (): string {
                return file_get_contents(__DIR__ . '/../../graphql/schema.graphql');
            }
        );

        Config::set('lighthouse.namespaces.models', [
            'Yago\\OpeningHours\\Models',
            ...Config::get('lighthouse.namespaces.models'),
        ]);

        Config::set('lighthouse.namespaces.mutations', [
            'Yago\\OpeningHours\\GraphQL\\Mutations',
            ...Config::get('lighthouse.namespaces.mutations'),
        ]);
    }

    public function boot(ModuleService $moduleService)
    {
        $moduleService->register('opening-hours');

        $moduleService->registerBlock('opening-hours', 'opening-hours-today', [OpeningHoursController::class, 'today']);
        $moduleService->registerBlock('opening-hours', 'opening-hours-listing', [OpeningHoursController::class, 'listing']);

        $this->loadRoutesFrom(__DIR__ . '/../../routes/web.php');
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations/');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'yago-opening-hours');
        $this->loadTranslationsFrom(__DIR__ . '/../../resources/lang', 'yago-opening-hours');

        $this->publishes([
            __DIR__ . '/../../resources/dist' => public_path('vendor/opening-hours'),
        ], 'yago-opening-hours');
    }
}
