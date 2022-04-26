<?php

use Yago\Article\Http\Controllers\ArticleController;

Route::middleware(['web'])->group(function () {
    Route::prefix('yago')
        ->name('yago.')
        ->group(function () {
            Route::prefix('article')
                ->name('article.')
                ->group(function () {
                    Route::get('featured', [ArticleController::class, 'featured'])->name('featured');
                    Route::get('listing', [ArticleController::class, 'listing'])->name('listing');
                    Route::get('show', [ArticleController::class, 'show'])->name('show');
                });
        });
});
