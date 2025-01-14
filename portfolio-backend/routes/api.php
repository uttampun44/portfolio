<?php

use App\Http\Controllers\Authentication\AuthenticationController;
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
    Route::get('/project-categories', [ProjectCategoryController::class, 'index']);
    Route::resource('/projects', ProjectController::class)->only(['index']);
});