<?php

namespace Yago\OpeningHours\Http\Controllers;

use Illuminate\Http\Request;
use Yago\Cms\Http\Controllers\Controller;
use Yago\OpeningHours\Models\OpeningHour;
use Yago\OpeningHours\Models\OpeningHourException;

class OpeningHoursController extends Controller
{
    public function today(Request $request)
    {
        $config = $this->getConfig($request);

        $openingHoursToday = OpeningHour::query()
            ->where('name', strtolower(date('l')))
            ->first();

        $openingHourExceptionToday = OpeningHourException::query()
            ->where('date', date('Y-m-d'))
            ->first();

        $groupedOpeningHours = [];

        $openingHours = OpeningHour::all();

        foreach ($openingHours as $openingHour) {
            $key = 'closed';

            if (!$openingHour->is_closed) {
                $key = "{$openingHour['open']}-{$openingHour['close']}";
            }

            $groupedOpeningHours[$key][] = $openingHour;
        }

        $openingHourExceptions = OpeningHourException::query()
            ->whereBetween('date', [date('Y-m-d'), date('Y-m-d', strtotime('+1 week'))])
            ->orderBy('date')
            ->get();

        return view('yago-opening-hours::opening-hours.today', compact(
            'config',
            'openingHoursToday',
            'openingHourExceptionToday',
            'openingHours',
            'openingHourExceptions',
            'groupedOpeningHours',
        ));
    }

    public function listing(Request $request)
    {
        $openingHours = OpeningHour::all();

        $openingHourExceptions = OpeningHourException::query()
            ->orderBy('date')
            ->get();

        return view('yago-opening-hours::opening-hours.listing', compact(
            'openingHours',
            'openingHourExceptions',
        ));
    }
}
