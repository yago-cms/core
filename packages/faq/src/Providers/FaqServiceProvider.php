<?php

namespace Yago\Faq\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Yago\Cms\Services\ModuleService;
use Yago\Faq\Http\Controllers\FaqController;

class FaqServiceProvider extends ServiceProvider
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
            'Yago\\Faq\\Models',
            ...Config::get('lighthouse.namespaces.models'),
        ]);
    }

    public function boot(ModuleService $moduleService)
    {
        $moduleService->register('faq');

        $moduleService->registerBlock('faq', 'faq-listing', [FaqController::class, 'listing']);

        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations/');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'yago-faq');

        $this->publishes([
            __DIR__ . '/../../resources/dist' => public_path('vendor/faq'),
        ], 'yago-faq');
    }
}