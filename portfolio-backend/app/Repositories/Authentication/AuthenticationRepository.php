<?php

namespace App\Repositories\Authentication;

use App\Models\User;
use App\Repositories\AuthenticationInterface;

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

    public function postAuthentication(array $data): User
    {
        return $this->user->create($data);
    }
}
