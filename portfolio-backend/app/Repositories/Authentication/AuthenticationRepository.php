<?php

namespace App\Repositories\Authentication;

use App\Models\User;
use App\Repositories\AuthenticationInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationRepository implements AuthenticationInterface
{
    /**
     * Create a new class instance.
     */
    
    public function __construct(public User $user)
    {
        //
    }

    public function getAuthentication()
    {
        return true;
    }

    public function loginAuthentication(array $credentials): String
    {
        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return $user->createToken('auth_token')->plainTextToken;
        }

        throw new \Exception('Invalid credentials');
    }

    public function logoutAuthentication(string $token): bool
    {
       $user = Auth::user();
       if($user){
           $user->currentAccessToken()->delete();
           return true;
       }

       throw new \Exception('User not authenticated');
    }

    public function signupAuthentication(array $data): User
    {
        $email = User::where('email', $data['email'])->first();

        // check email already exists
        if($email){
            throw new \Exception('Email already exists');
        }

        if(isset($data['password'])){
            $data['password'] = Hash::make($data['password']);
        }
        return $this->user->create($data);
    }
}
