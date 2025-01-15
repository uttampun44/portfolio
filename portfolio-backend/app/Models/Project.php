<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $table = ["projects"];

    protected $fillable = ['id', 'name', 'image', 'link', 'project_category_id'];

    public function projectCategory():BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class);
    }
}
