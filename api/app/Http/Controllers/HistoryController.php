<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\History;


class HistoryController extends Controller
{
    public function updateHistory($userID, $chapterID){
        $mangaWhichChapterBelong=DB::select("SELECT * from mangas, chapter_manga where mangas.id=chapter_manga.manga_id and chapter_manga.chapter_id=$chapterID ");
        // $hisExist=  DB::select("SELECT * from history where user_id = $userID and chapter_id = $chapterID");
        $mangaID=$mangaWhichChapterBelong[0]->id;
        $chapterListOfThatManga=DB::select("SELECT chapter_id from chapter_manga where manga_id= $mangaID");
        // return $chapterListOfThatManga;
        $chapterList=array();
        foreach ($chapterListOfThatManga as $anObject){
           array_push( $chapterList,$anObject->chapter_id);
        }
        // return  $chapterList;
        $hisExist=  DB::select("SELECT history.chapter_id from history, chapter_manga where user_id = $userID and history.chapter_id=chapter_manga.chapter_id and chapter_manga.manga_id=$mangaID");
        // if (in_array($chapterID, $chapterList)) {
        //     echo "Got mac";
        // }

        if (count($hisExist)==0){
            //import
            $hisNew= new History;
            $hisNew->user_id= $userID;
            $hisNew->chapter_id= $chapterID;
            $hisNew->save();
            return response()->json(['message' =>  "Imported to history user_id=$userID, chapter_id=$chapterID"],  200);
        }else{
            $oldChapterID=$hisExist[0]->chapter_id;
            // $hisUpdate = DB::select("SELECT * from history where user_id = $userID and chapter_id = $newChapterID");

            // $hisUpdate[0]->chapter_id= $chapterID;
            // $hisUpdate[0]->save();
            $hisUpdate = DB::table('history')
              ->where(['chapter_id'=>$oldChapterID, 'user_id'=>$userID])
              ->update(['chapter_id' => $chapterID]); 
            return response()->json(['message' =>  "Updated history user_id=$userID, chapter_id=$chapterID"],  200);

        }

    }
}
