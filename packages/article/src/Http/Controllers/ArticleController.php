<?php

namespace Yago\Article\Http\Controllers;

use Yago\Cms\Helpers\ModuleHelper;
use Yago\Cms\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Yago\Article\Models\Article;
// use Yago\Article\Models\ArticleRevision;

class ArticleController extends Controller
{
    public function show(Request $request)
    {
        $segment = $this->getSegment($request);

        $article = Article::where('slug', $segment)
            ->get()
            ->first();

        if (!$article) {
            abort(404);
        }

        return view('yago-article::articles.show', compact('article'));
    }

    public function listing(Request $request)
    {
        $config = $this->getConfig($request);

        $query = Article::query();

        if (isset($config->categories) && count($config->categories)) {
            $query->ofCategories($config->categories);
        }

        $query->inDateRange();

        if (isset($config->limit) && (int)$config->limit > 0) {
            $query->limit($config->limit);
        }

        $articles = $query->get();

        $pageRoute = ModuleHelper::getPageRoute(config('page.currentPageId'));

        return view('yago-article::articles.listing', compact(
            'config',
            'pageRoute',
            'articles'
        ));
    }

    public function featured(Request $request)
    {
        $config = $this->getConfig($request);

        $query = Article::query();

        if (isset($config->categories) && count($config->categories)) {
            $query->ofCategories($config->categories);
        }

        $query->inDateRange();

        if (isset($config->limit)) {
            $query->limit($config->limit);
        }

        $articles = $query->get();

        $pageRoute = ModuleHelper::getPageRoute($config->page);

        return view('yago-article::articles.featured', compact(
            'config',
            'pageRoute',
            'articles'
        ));
    }
}
