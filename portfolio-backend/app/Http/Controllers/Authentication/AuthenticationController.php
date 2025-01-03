<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\Authentication\LoginRequest;
use App\Repositories\AuthenticationInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthenticationController extends Controller
{
    public function __construct(public AuthenticationInterface $authenticationInterface)
    {
        $this->authenticationInterface = $authenticationInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            $loginData =  $this->authenticationInterface->postAuthentication($data);
    
            return response()->json([
                'message' => 'Login successful',
                'data' => $loginData
            ], 200);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json([
                'message' => 'Login failed',
                'error' => $th->getMessage()
            ], 400);
        }
    }
}
