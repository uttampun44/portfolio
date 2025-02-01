<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\MapLocation;
use Illuminate\Http\Request;

class FrontMapController extends Controller
{
    public function map()
    {
        return response()->json([
            'map' => MapLocation::select('id', 'map_link')->get(),
        ], 200);
    }
}
