<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Manga;
use Illuminate\Support\Facades\Storage;
use App\Document;
use Validator;
class FileController extends Controller{
    public function uploadChapter(Request $request){

        // $result=$request->file('files')->store('uploads');
        // return ["result"=> $result];
       // return $request->chapters;
        return "a";
        //Storage::put('avatars/1', $request)
        
    }
    public function store(Request $request)
    {
        if ($files = $request->file('file')) {
             
            //store file into document folder
            $file = $request->file->store('public/');
 
            //store your file into database
              
            return response()->json([
                "success" => true,
                "message" => "File successfully uploaded",
                "file" => $file
            ]);
  
        }
 
  
    }
}