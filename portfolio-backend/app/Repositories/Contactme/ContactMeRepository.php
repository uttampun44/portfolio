<?php

namespace App\Repositories\Contactme;

use App\Models\ContactMe;
use App\Repositories\ContactMeInterface;

class ContactMeRepository implements ContactMeInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(public ContactMe $contatMe)
    {
    
    }

    public function getContactMe()
    {
        return $this->contatMe->select('id', 'contact_name', 'email', 'phone_number', 'street', 'city', 'postal_code', 'message')->get();
    }

    public function postContactMe(array $data): ContactMe
    {
        return $this->contatMe->create($data);
    }

    public function deleteContactMe(ContactMe $contactMe)
    {
        return $contactMe->delete();
    }

    public function find(int $id): ?ContactMe
    {
        return $this->contatMe->find($id);
    }
}
