<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

if(!function_exists('uploadImage')){
    function uploadImage(UploadedFile $image):string{
        if ($image) {
          
            $uniqueName = uniqid() . '_' . $image->getClientOriginalName();
            Log::info("Uploading image: $uniqueName");
            $path = $image->storeAs('images', $uniqueName, 'public');
            Log::info("Image uploaded successfully: $path");

            if (!$path) {
                throw new \Exception('File upload failed.');
            }

            return $path;
        }
        return null;
    }
}