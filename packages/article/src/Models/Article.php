<?php

namespace Yago\Article\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    public function scopeInDateRange($query)
    {
        $query->whereDate('start', '<=', date('Y-m-d H:i:s'));
        $query->where(function ($query) {
            $query
                ->whereNull('stop')
                ->orWhereDate('stop', '>', date('Y-m-d H:i:s'));
        });

        return $query;
    }

    public function scopeOfCategories($query, $categories)
    {
        return $query->whereHas('articleCategories', function ($query) use ($categories) {
            $query->whereIn('article_categories.id', $categories);
        });
    }

    public function articleCategories(): BelongsToMany
    {
        return $this->belongsToMany(ArticleCategory::class);
    }

    public function articleMedias(): HasMany
    {
        return $this->hasMany(ArticleMedia::class);
    }
}
