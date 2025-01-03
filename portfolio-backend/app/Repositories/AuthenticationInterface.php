<?php

namespace App\Repositories;

use App\Models\User;

interface AuthenticationInterface
{
    public function getAuthentication();

    public function postAuthentication(array $data): User;
}