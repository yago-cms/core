<?php

namespace Yago\Article\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Yago\Article\Http\Controllers\ArticleController;
use Yago\Article\View\Components\Carousel;
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

        $moduleService->registerBlock('article', 'article-featured', [ArticleController::class, 'featured']);

        $moduleService->registerBlock('article', 'article-listing', [ArticleController::class, 'listing'], 0);
        $moduleService->registerBlock('article', 'article-listing', [ArticleController::class, 'show'], 1);

        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations/');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'yago-article');
        $this->loadViewComponentsAs('yago-article', [
            Carousel::class,
        ]);

        $this->publishes([
            __DIR__ . '/../../resources/dist' => public_path('vendor/article'),
        ], 'yago-article');
    }
}