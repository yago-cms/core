<div class="opening-hours-today">

    @foreach ($openingHours as $openingHour)
        @php
            $times = collect([$openingHour->open, $openingHour->close]);
            $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
        @endphp

        <li class="opening-hours-today__exceptions__list__item">
            {{ __(Str::ucfirst($openingHour->name)) }}:

            @if ($openingHour->is_closed)
                {{ __('Closed') }}
            @else
                {{ $times->join('-') }}

                @if ($openingHour->is_closed_for_lunch)
                    @php
                        $times = collect([$openingHour->lunch_close, $openingHour->lunch_open]);
                        $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
                    @endphp

                    ({{ __('Closed for lunch') }}:
                    {{ $times->join('-') }})
                @endif
            @endif
        </li>
    @endforeach

    <div class="opening-hours-today__exceptions">
        <h4 class="opening-hours-today__exceptions__heading">
            {{ __('Exceptional opening hours') }}
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
                        ({{ __('Today') }})
                        :
                    @else
                        ({{ date('l jS', strtotime($openingHourException->date)) }})
                        :
                    @endif

                    @if ($openingHourException->is_closed)
                        {{ __('Closed') }}
                    @else
                        {{ $times->join('-') }}

                        @if ($openingHourException->is_closed_for_lunch)
                            @php
                                $times = collect([$openingHourException->lunch_close, $openingHourException->lunch_open]);
                                $times = $times->map(fn($time) => Str::replaceLast(':00', '', $time));
                            @endphp

                            ({{ __('Closed for lunch') }}:
                            {{ $times->join('-') }})
                        @endif
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</div>
