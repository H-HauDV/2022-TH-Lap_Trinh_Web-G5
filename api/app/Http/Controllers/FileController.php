<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Manga;
use Illuminate\Support\Facades\Storage;
class FileController extends Controller{
    public function uploadChapter(Request $request){

        // $result=$request->file('files')->store('uploads');
        // return ["result"=> $result];
       // return $request->chapters;
        return "a";
        //Storage::put('avatars/1', $request);

        
    }
}