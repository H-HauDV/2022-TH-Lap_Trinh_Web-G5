<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function newest(){
        return  DB::select("SELECT * from comment");
    }
}
