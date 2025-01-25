<?php

namespace App\Repositories;

use App\Models\ContactMe;

interface ContactMeInterface
{
    public function getContactMe();

    public function postContactMe(array $data):ContactMe;

    public function deleteContactMe(ContactMe $contactMe);
}