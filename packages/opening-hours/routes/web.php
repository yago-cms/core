<?php

use Yago\OpeningHours\Http\Controllers\OpeningHoursController;

Route::middleware(['web'])->group(function () {
    Route::prefix('yago')
        ->name('yago.')
        ->group(function () {
            Route::prefix('opening-hours')
                ->name('opening-hours.')
                ->group(function () {
                    Route::get('today', [OpeningHoursController::class, 'today'])->name('today');
                    Route::get('listing', [OpeningHoursController::class, 'listing'])->name('listing');
                });
        });
});
