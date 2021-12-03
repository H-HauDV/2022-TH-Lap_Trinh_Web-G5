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
        $isExist=  Manga::where('name', '=', $mangaName)->first();;
        if ($isExist === null) {
            // Manga does not exist
            return 0;
          } else {
            // Manga exits
            return 1;
          }
    }
}

