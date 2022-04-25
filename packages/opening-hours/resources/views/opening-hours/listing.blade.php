<div class="opening-hours-today">

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

                @if ($openingHour->is_closed_for_lunch)
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

    @if (count($openingHourExceptions) > 0)
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

                        @if (date('Y-m-d') == $openingHourException->date)
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

                            @if ($openingHourException->is_closed_for_lunch)
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
