<?php

namespace Yago\Article\Services;

use Yago\Cms\Services\AbstractDataProviderService;
use Yago\Article\Models\Article;

class DataProviderService extends AbstractDataProviderService
{
    public function carousel(array $pageBlock)
    {
        $config = json_decode($pageBlock['content']);

        $query = Article::query();

        $articles = $query->get();

        return $articles;
    }
}
