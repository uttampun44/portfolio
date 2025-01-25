<?php

namespace App\Http\Controllers\Contactme;

use App\Http\Controllers\Controller;
use App\Models\ContactMe;
use App\Repositories\ContactMeInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactmeController extends Controller
{
    public function __construct(public ContactMeInterface $contactmeInterface)
    {
        $this->contactmeInterface = $contactmeInterface;

    }
    public function index()
    {
      return $this->contactmeInterface->getContactMe();
    }

    public function store(Request $request)
    {
        $this->contactmeInterface->postContactMe($request->all());
        return response()->json([
            'message' => 'Contact me created successfully',
        ], 201);
    }

   public function destroy($id)
   {
    try {
        $contactme = $this->contactmeInterface->deleteContactMe($id);
        if(!$contactme)
        {
            return response()->json(['error' => 'Contact me not found'], 404);
        }
        return response()->json([
            'message' => 'Contact me deleted successfully',
        ], 200);
    } catch (\Throwable $th) {
        Log::error("error" . $th->getMessage());
        return response()->json(['error' => $th->getMessage()], 500);
    }
   }
}
