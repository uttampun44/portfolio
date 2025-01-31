<?php

namespace App\Http\Controllers\Map;

use App\Http\Controllers\Controller;
use App\Models\MapLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MapController extends Controller
{
    public function index()
    {
      return response()->json(MapLocation::select('id', 'map_link')->get(), 200);
    }

    public function store(Request $request)
    {
        try {
            MapLocation::create($request->all());
            return response()->json([
                'message' => 'Map location created successfully',
            ], 201);
        } catch (\Throwable $th) {
            Log::error("error" . $th->getMessage());
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $mapLocation = MapLocation::find($request->id);
            $mapLocation->update($request->all());
           
            return response()->json([
                'message' => 'Map location updated successfully',
            ], 200);
        } catch (\Throwable $th) {
            Log::error("error" . $th->getMessage());
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

 
}
