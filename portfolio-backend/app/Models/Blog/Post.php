<?php

namespace App\Models\Blog;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $table = 'posts';

    protected $fillable = [
        'title',
        'mini_title',
        'tags',
        'image',
        'content',
        'blog_category_id',
    ];

    public function blog_category():BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }
}
