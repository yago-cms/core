<x-yago-cms::core.accordion id="faqs">
    @foreach ($faqs as $i => $faq)
        <x-yago-cms::core.accordion.item id="faqs" :i="$i" :label="$faq->name" :isUseLabelAsId="true">
            {!! $faq->content !!}
        </x-yago-cms::core.accordion.item>
    @endforeach
</x-yago-cms::core.accordion>
