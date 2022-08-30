<div class="article-featured">
    @foreach ($articles as $article)
        <div class="article-featured__item mb-3">
            <div class="row">
                <div class="col-md-4">
                    @if (count($article->articleMedias))
                        <x-yago-cms::core.picture class="article-featured__item__picture"
                            img-class="article-featured__item__img img-fluid" :media="$article->articleMedias->first()->source"
                            breakpointGroup="default" />
                    @endif
                </div>

                <div class="col-md-8">
                    <div class="article-featured__item__body">
                        <h2 class="article-featured__item__heading">{{ $article->name }}</h2>

                        <div class="article-featured__item__date">
                            {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $article->start)->format('Y-m-d') }}
                        </div>

                        <p>
                            @if (!empty($article->excerpt) && SettingsHelper::get('article.isExcerptsEnabled'))
                                {!! $article->excerpt !!}
                            @else
                                {!! Str::limit($article->content, SettingsHelper::get('article.truncate') ?? 100) !!}
                            @endif
                        </p>

                        <a href="{{ url("{$pageRoute}/{$article->slug}") }}"
                            class="article-featured__item__link btn btn-primary">{{ __('Read more') }}</a>
                    </div>
                </div>
            </div>
        </div>
    @endforeach

    <a href="{{ url($pageRoute) }}" class="article-featured__link btn btn-primary">{{ __('View all news') }}</a>
</div>
