<?php

namespace Yago\Faq\Providers;

use Illuminate\Support\ServiceProvider;

class FaqServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->publishes([
            // __DIR__ . '/../../public/css' => public_path('vendor/faq/css'),
            __DIR__ . '/../../public/js' => public_path('vendor/faq/js'),
        ], 'public');
    }
}