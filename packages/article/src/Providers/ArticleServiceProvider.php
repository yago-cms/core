<?php

namespace Yago\Article\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Yago\Cms\Services\ModuleService;

class ArticleServiceProvider extends ServiceProvider
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
            'Yago\\Article\\Models',
            ...Config::get('lighthouse.namespaces.models'),
        ]);
    }

    public function boot(ModuleService $moduleService)
    {
        $moduleService->register('article');

        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations/');
        // $this->loadViewsFrom(__DIR__ . '/../../resources/frontend/views', 'yago-article');

        $this->publishes([
            __DIR__ . '/../../public' => public_path('vendor/article'),
        ], 'public');
    }
}