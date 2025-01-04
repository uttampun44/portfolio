<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\Authentication\LoginRequest;
use App\Http\Requests\Authentication\SignupRequest;
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
        
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            $loginData =  $this->authenticationInterface->loginAuthentication($data);
    
            return response()->json([
                'message' => 'Login successful',
                'token' => $loginData
            ], 200);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json([
                'message' => 'Login failed',
                'error' => $th->getMessage()
            ], 400);
        }
    }

    public function logout(Request $request)
    {
       try {
            $token = $request->bearerToken();
           
            $data = $this->authenticationInterface->logoutAuthentication($token);

            return response()->json([
                'message' => 'Logout successful',
                 'data' => $data
            ], 200);

       } catch (\Throwable $th) {
         Log::error($th->getMessage());
         return response()->json([
             'message' => 'Logout failed',
             'error' => $th->getMessage()
         ], 400);
       }
    }

    public function Signup(SignupRequest $request)
    {
        try {
            $data = $request->validated();
            $signupData =  $this->authenticationInterface->signupAuthentication($data);
    
            return response()->json([
                'message' => 'Signup successful',
                'data' => $signupData
            ], 200);

        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json([
                'message' => 'Signup failed',
                'error' => $th->getMessage()
            ], 400);
        }
    }
}
