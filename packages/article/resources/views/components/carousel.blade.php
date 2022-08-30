@if (!empty($articles))
    @foreach ($articles as $article)
        <div class="swiper-slide">
            <h2 class="swiper-slide__caption">{{ $article->name }}</h2>

            <p class="swiper-slide__text">
                @if (!empty($article->excerpt) && SettingsHelper::get('article.isExcerptsEnabled'))
                    {!! $article->excerpt !!}
                @else
                    {!! Str::limit($article->content, SettingsHelper::get('article.truncate') ?? 100) !!}
                @endif
            </p>

            <a href="{{ url("{$pageRoute}/{$article->slug}") }}"
                class="btn btn-primary swiper-slide__cta">{{ __('Read more') }}</a>
        </div>
    @endforeach
@endif
