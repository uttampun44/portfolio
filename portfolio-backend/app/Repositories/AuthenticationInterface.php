<?php

namespace App\Repositories;

use App\Models\User;

interface AuthenticationInterface
{
    public function getAuthentication();

    public function loginAuthentication(array $credentials): array;

    public function logoutAuthentication(string $token): bool;

    public function signupAuthentication(array $data): User;
    
}