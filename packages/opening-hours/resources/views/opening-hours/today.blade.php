@php
if (!(array)$config) {
    return;
}
@endphp

<div class="opening-hours-today">
    @if ($config->showMessage)
        <p class="opening-hours-today__message">
            @if (($openingHourExceptionToday && $openingHourExceptionToday->is_closed) || $openingHoursToday->is_closed)
                {{ $config->messageClosed }}
            @else
                {{ $config->messageOpen }}
            @endif
        </p>
    @endif

    @if ($config->group === true)
        <div class="opening-hours-today__group">
            <ul class="opening-hours-today__group__list">
                @foreach ($groupedOpeningHours as $openClose => $openingHours)
                    @php
                        $isClosed = false;

                        if ($openClose == 'closed') {
                            $isClosed = true;

                            if ($config->showClosedDays === false) {
                                continue;
                            }
                        }

                        $openingHours = collect($openingHours);

                        $days = collect([$openingHours->first()->name, $openingHours->last()->name]);
                        $days = $days->unique();
                        $days = $days->map(fn($day) => __('yago-opening-hours::opening-hours.' . $day));

                        if (!$isClosed) {
                            $times = Str::of($openClose)->explode('-');
                            $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
                        }
                    @endphp

                    <li
                        class="opening-hours-today__group__list__item @if ($isClosed) opening-hours-today__group__list__item--is--closed @endif">
                        @if ($isClosed)
                            {{ $days->join('-') }}: {{ __('yago-opening-hours::opening-hours.closed') }}
                        @else
                            {{ $days->join('-') }}: {{ $times->join('-') }}<br>
                        @endif
                    </li>
                @endforeach
            </ul>
        </div>
    @else
        @foreach ($openingHours as $openingHour)
            @php
                $times = collect([$openingHour->open, $openingHour->close]);
                $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
            @endphp

            <li class="opening-hours-today__exceptions__list__item">
                {{ __('yago-opening-hours::opening-hours.' . $openingHour->name) }}:

                @if ($openingHour->is_closed)
                    {{ __('yago-opening-hours::opening-hours.closed') }}
                @else
                    {{ $times->join('-') }}

                    @if ($config->showClosedForLunch && $openingHour->is_closed_for_lunch)
                        @php
                            $times = collect([$openingHour->lunch_close, $openingHour->lunch_open]);
                            $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
                        @endphp

                        ({{ __('yago-opening-hours::opening-hours.closed_for_lunch') }}:
                        {{ $times->join('-') }})
                    @endif
                @endif
            </li>
        @endforeach
    @endif

    @if ($config->showExceptions && count($openingHourExceptions) > 0)
        <div class="opening-hours-today__exceptions">
            <h4 class="opening-hours-today__exceptions__heading">
                {{ __('yago-opening-hours::opening-hours.exceptional_opening_hours') }}
            </h4>

            <ul class="opening-hours-today__exceptions__list">
                @foreach ($openingHourExceptions as $openingHourException)
                    @php
                        $times = collect([$openingHourException->open, $openingHourException->close]);
                        $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
                    @endphp

                    <li class="opening-hours-today__exceptions__list__item">
                        {{ $openingHourException->name }}

                        @if ($config->showMessage === false && date('Y-m-d') == $openingHourException->date)
                            ({{ __('yago-opening-hours::opening-hours.today') }})
                            :
                        @else
                            ({{ date('l jS', strtotime($openingHourException->date)) }})
                            :
                        @endif

                        @if ($openingHourException->is_closed)
                            {{ __('yago-opening-hours::opening-hours.closed') }}
                        @else
                            {{ $times->join('-') }}

                            @if ($config->showClosedForLunch && $openingHourException->is_closed_for_lunch)
                                @php
                                    $times = collect([$openingHourException->lunch_close, $openingHourException->lunch_open]);
                                    $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
                                @endphp

                                ({{ __('yago-opening-hours::opening-hours.closed_for_lunch') }}:
                                {{ $times->join('-') }})
                            @endif
                        @endif
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
</div>
