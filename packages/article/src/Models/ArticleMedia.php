<?php

namespace Yago\Article\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleMedia extends Model
{
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
