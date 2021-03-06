<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Manga;
use App\Models\Category;
use App\Models\Manga_category;
use Carbon\Carbon;
class RatingController extends Controller
{
    public function receiveRating(Request $request){
        $user_id=$request->user_id;
        $manga_id=$request->manga_id;
        $rate = $request->rate;
        $isExist=DB::select("SELECT * FROM rating where manga_id=$manga_id AND user_id=$user_id");
        //$values = array('user_id' => $user_id,'manga_id' => $manga_id,'rate' => $rate);   
        //DB::table('rating')->insert($values);
        if ($isExist!=null){
            //update
            // $isExist->rate= $rate;
            //$isExist->rate_date=Carbon::now()->timestamp;
            // $isExist->save();
            return response()->json(['message' =>  "Updated successfully"],  200);
        }else{
            //add new record
            $values = array('user_id' => $user_id,'manga_id' => $manga_id,'rate' => $rate);  
            // Rating::insert($values);
            return response()->json(['message' =>  "Added successfully"],  200);
        }
        return response()->json(['message' =>  "Faild!"],  400);
    }
    public function getRatePointOfManga($mangaID){
        $mangaRate=DB::select("SELECT AVG(rate) as avg_rate FROM rating where manga_id=$mangaID");
        return $mangaRate[0]->avg_rate;
    }
    
}

