@php
$id = 'bs-accordion-' . Str::uuid();
$isAlwaysOpen = $content->alwaysOpen;
$isFirstOpen = $content->firstOpen;
$isUseLabelAsId = $content->useLabelAsId;
@endphp

@if ($content->type == 'card')
    <x-core.accordion
        :id="$id"
    >
        @foreach ($cards as $i => $card)
            <x-core.accordion.item
                :id="$id"
                :i="$i"
                :label="$card['label']"
                :is-always-open="$isAlwaysOpen"
                :is-first-open="$isFirstOpen"
                :is-use-label-as-id="$isUseLabelAsId"
            >
                <x-dynamic-component :component="$cardComponent" :card="$card" />
            </x-core.accordion.item>
        @endforeach
    </x-core.accordion>
@elseif ($content->type == 'text')
    <x-core.accordion
        :id="$id"
    >
        @foreach ($content->texts as $i => $text)
            <x-core.accordion.item
                :id="$id"
                :i="$i"
                :label="$text->label"
                :is-always-open="$isAlwaysOpen"
                :is-first-open="$isFirstOpen"
                :is-use-label-as-id="$isUseLabelAsId"
            >
                @if (isset($text->text))
                    {!! $text->text !!}
                @endif
            </x-core.accordion.item>
        @endforeach
    </x-core.accordion>
@endif
