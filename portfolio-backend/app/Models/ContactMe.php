<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMe extends Model
{
    protected $table = 'contact_me';

    protected $fillable = [
        'contact_name',
        'email',
        'phone_number',
        'street',
        'city',
        'postal_code',
        'message',
    ];
}
