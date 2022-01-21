<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Manga;
use App\Models\Category;
use App\Models\Manga_category;
use App\Models\Rating;
use Carbon\Carbon;
class RatingController extends Controller
{
    public function receiveRating(Request $request){
        $user_id=$request->user_id;
        $manga_id=$request->manga_id;
        $rate = $request->rate;
        $isExist=Rating::select('*')->where([["user_id",$user_id],["manga_id",$manga_id]])->first();
        //$values = array('user_id' => $user_id,'manga_id' => $manga_id,'rate' => $rate);   
        //DB::table('rating')->insert($values);
        if ($isExist!=null){
            //update
            $isExist->rate= $rate;
            //$isExist->rate_date=Carbon::now()->timestamp;
            $isExist->save();
            return response()->json(['message' =>  "Updated successfully"],  200);
        }else{
            //add new record
            $values = array('user_id' => $user_id,'manga_id' => $manga_id,'rate' => $rate);  
            Rating::insert($values);
            return response()->json(['message' =>  "Added successfully"],  200);
        }
        return response()->json(['message' =>  "Faild!"],  400);
    }
    
}

