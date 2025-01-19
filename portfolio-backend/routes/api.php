<?php

use App\Http\Controllers\Authentication\AuthenticationController;
use App\Http\Controllers\Blog\BlogCategory;
use App\Http\Controllers\Blog\BlogCategoryController;
use App\Http\Controllers\Blog\PostController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Project\ProjectCategoryController;
use App\Http\Controllers\Project\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/sign-up', [AuthenticationController::class, 'signup']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'getDashboard']);
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::resource('/project-categories', ProjectCategoryController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/projects', ProjectController::class)->only(['index', 'store' ,'edit', 'update', 'destroy']);
    Route::resource('/blog-categories', BlogCategoryController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
    Route::resource('/posts', PostController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);
});