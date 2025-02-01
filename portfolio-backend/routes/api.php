<?php

use App\Http\Controllers\Authentication\AuthenticationController;
use App\Http\Controllers\Blog\BlogCategoryController;
use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\Contactme\ContactmeController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\HomeController;

use App\Http\Controllers\Map\MapController;
use App\Http\Controllers\Project\ProjectCategoryController;
use App\Http\Controllers\Project\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/sign-up', [AuthenticationController::class, 'signup']);
Route::get('/home', [HomeController::class, 'home']);
Route::post('/contact-me', [ContactmeController::class, 'store']);
Route::get('/blogs', [BlogController::class, 'posts']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'getDashboard']);
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::resource('/project-categories', ProjectCategoryController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/projects', ProjectController::class)->only(['index', 'store' ,'edit', 'update', 'destroy']);
    Route::resource('/blog-categories', BlogCategoryController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/posts', PostController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
    Route::get('/map', [MapController::class, 'index']);
    Route::post('/map-links', [MapController::class, 'store']);
    Route::put('/map/{id}', [MapController::class, 'update']);
    Route::get('/contact-me', [ContactmeController::class, 'index']);
    Route::delete('/contact-me/{id}', [ContactmeController::class, 'destroy']);
});