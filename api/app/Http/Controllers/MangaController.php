<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Manga;
use App\Models\Category;
use App\Models\Manga_category;

class MangaController extends Controller
{
    public function index(){
        // return Manga::orderBy('id', 'asc')->paginate(8);
        return  DB::select("SELECT id, name, main_image from mangas");
    }
    public function getMangaForHomePage(){
        // return Manga::orderBy('id', 'asc')->paginate(8);
        return  DB::select("SELECT id, name, main_image from mangas ORDER BY update_date ASC limit 11 ");
    }
    public function getCarosel(){
        return Manga::orderBy('update_date', 'asc')->limit(10)->get();
    }
    public function total(){
        return Manga::select('select * from mangas')->count();
    }
    public function getFromID($id){
        return Manga::select('*')->where('id', $id)->first();
    }
    public function getTagFromID($id){
        return DB::select("SELECT DISTINCT category.category_name from mangas, category, manga_category where mangas.id=manga_category.manga_id and manga_category.category_id=category.id and mangas.id= $id");
    }
    public function getViewCountFromID($id){
        return DB::select("SELECT SUM(view) as count from mangas, chapter_manga where mangas.id=chapter_manga.manga_id and mangas.id= $id");
    }
    public function getChapterFromID($id){
        return DB::select("SELECT chapter_id, chapter_name, chapter_manga.update_date, view from chapter_manga, mangas where mangas.id=chapter_manga.manga_id and mangas.id= $id ORDER BY chapter_count ASC");
    }
    public function getImageFromChapterID($id){
        return DB::select("SELECT image_link from chapter_image where  chapter_id= $id ORDER BY image_count ASC");
    }
    public function getAllTags(){
        return DB::select("SELECT * from category");
    }
    public function checkMangaName($mangaName){
        $isExist=  Manga::where('name', '=', $mangaName)->first();
        if ($isExist === null) {
            // Manga does not exist
            return 0;
          } else {
            // Manga exits
            return 1;
          }
    }
    public function getNextChapter($chapterID){
        $mangaIDArray= DB::select("SELECT manga_id from chapter_manga where  chapter_id= $chapterID ");
        if($mangaIDArray==null) return response()->json(['message' => 'Chapter ID is incorrect'], 100);
        $mangaID= intval(implode(',', array_column($mangaIDArray, 'manga_id')));
        $nextChapterIDPlot=intval($chapterID)+1;
        $nextChapterIDArray= DB::select("SELECT chapter_id from chapter_manga where  manga_id= $mangaID and chapter_id= $nextChapterIDPlot Limit 1");
        if($nextChapterIDArray==null) return response()->json(['message' => 'No next chapter'], 400);
        $nextChapterID= intval(implode(',', array_column($nextChapterIDArray, 'chapter_id')));
        return $nextChapterID;
    }
    public function getPrevChapter($chapterID){
        $mangaIDArray= DB::select("SELECT manga_id from chapter_manga where  chapter_id= $chapterID ");
        if($mangaIDArray==null) return response()->json(['message' => 'Chapter ID is incorrect'], 100);
        $mangaID= intval(implode(',', array_column($mangaIDArray, 'manga_id')));
        $prevChapterIDPlot=intval($chapterID)-1;
        $prevChapterIDArray= DB::select("SELECT chapter_id from chapter_manga where  manga_id= $mangaID and chapter_id= $prevChapterIDPlot Limit 1");
        if($prevChapterIDArray==null) return response()->json(['message' => 'No previous chapter'], 400);
        $prevChapterID= intval(implode(',', array_column($prevChapterIDArray, 'chapter_id')));
        return $prevChapterID;
    }
    public function getMangaNameFromChapterID($chapterID){
        $manga=  DB::select("SELECT distinct mangas.name as mangaName, mangas.id as id from chapter_manga, mangas 
        where  chapter_manga.manga_id= mangas.id and chapter_manga.chapter_id=$chapterID ");
        if ($manga === null) {
            // Manga does not exist
            return response()->json(['message' =>  "Manga does not exist"],  400);
          } else {
            // Manga exits
            return $manga[0];
          }
    }
    public function getSearchSuggestionFromName($mangaName){
        $manga=  DB::select("SELECT mangas.name as mangaName from mangas 
        where  mangas.name LIKE '%$mangaName%'");
        if ($manga === null) {
            // Manga does not exist
            return response()->json(['message' =>  "Manga does not exist"],  400);
          } else {
            // Manga exits
            return $manga;
          }
    }
    public function getAllManga(){
        return Manga::orderBy('id', 'asc')->get();
    }
    public function getMangaIDFromMangaName($name){
        return Manga::select('id')->where('name', $name)->first();
    }
    
}

