<div class="container">
    <div class="article-show">
        <div class="article-show__media">
            @foreach ($article->articleMedias as $articleMedia)
                <x-yago-cms::core.picture class="article-show__picture" img-class="article-show__img img-fluid" :media="$articleMedia->source"
                    breakpointGroup="default" />
            @endforeach
        </div>


        <div class="article-show__body">
            <h1 class="article-show__heading">{{ $article->name }}</h1>

            <div class="article-show__item__date">
                {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $article->start)->format('Y-m-d') }}
            </div>

            <p>{!! $article->content !!}</p>
        </div>

        @if (count($article->articleCategories))
            <div class="article-show__footer">
                <div class="article-show__categories">
                    <h2 class="article-show__categories__heading">Categories</h2>
                    <ul class="article-show__categories__list">
                        @foreach ($article->articleCategories as $articleCategory)
                        <li>{{ $articleCategory->name }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        @endif
    </div>
</div>
