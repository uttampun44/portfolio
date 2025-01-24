<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home()
    {
        $all = Project::select('id', 'name', 'image', 'link')->get();

        $react = Project::whereHas('projectCategory', function($query){
                                $query->where('name', 'React');
                     })->select('id', 'name', 'image', 'link')->get();
        
        $laravel  = Project::whereHas('projectCategory', function($query){
                                $query->where('name', 'Laravel');
                     })->select('id', 'name', 'image', 'link')->get();

        return response()->json([
            'react' => $react,
            'laravel' => $laravel,
            'all_projects' => $all,
        ], 200);
    }
}
