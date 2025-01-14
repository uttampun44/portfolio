<?php

use Illuminate\Http\UploadedFile;

if(!function_exists('uploadImage')){
    function uploadImage(UploadedFile $image):string{
        if ($image) {
          
            $uniqueName = uniqid() . '_' . $image->getClientOriginalName();

            $path = $image->storeAs('images', $uniqueName, 'public');

            if (!$path) {
                throw new \Exception('File upload failed.');
            }

            return $path;
        }
        return null;
    }
}