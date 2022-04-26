<?php

use Yago\Faq\Http\Controllers\FaqController;

Route::middleware(['web'])->group(function () {
    Route::prefix('yago')
        ->name('yago.')
        ->group(function () {
            Route::prefix('faq')
                ->name('faq.')
                ->group(function () {
                    Route::get('listing', [FaqController::class, 'listing'])->name('listing');
                });
        });
});
