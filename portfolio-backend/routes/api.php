<?php

use App\Http\Controllers\Authentication\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/logout', [AuthenticationController::class, 'logout'])->middleware("auth:sanctum");
Route::post('/sign-up', [AuthenticationController::class, 'signup']);