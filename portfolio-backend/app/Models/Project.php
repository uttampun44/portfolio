<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = ["projects"];

    protected $fillable = ['id', 'name', 'image', 'link', 'project_category_id'];
}
