<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Manga;
use App\Models\Category;
use App\Models\Manga_category;

class CommentController extends Controller
{
    public function newest(){
        return  DB::select("SELECT mangas.name as manga_name, users.name as user_name, content from comment, mangas, users 
        where comment.manga_id=mangas.id and comment.user_id=users.id
        ORDER BY comment.created_at ASC");
    }
}

