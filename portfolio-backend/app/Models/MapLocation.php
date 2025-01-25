<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MapLocation extends Model
{
    protected $table = 'my_map_locations';

    protected $fillable = [
        'map_link'
    ];
}
