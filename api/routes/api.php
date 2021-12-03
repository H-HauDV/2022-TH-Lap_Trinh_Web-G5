<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/mangaCarosel', [MangaController::class, 'getCarosel']);
Route::get('/mangas/homePage', [MangaController::class, 'getMangaForHomePage']);
Route::get('/manga/{id}', [MangaController::class, 'getFromID']);
Route::get('/mangaTags/{id}', [MangaController::class, 'getTagFromID']);
Route::get('/mangaViewCount/{id}', [MangaController::class, 'getViewCountFromID']);
Route::get('/mangaChapterList/{id}', [MangaController::class, 'getChapterFromID']);
Route::get('/chapterImageList/{id}', [MangaController::class, 'getImageFromChapterID']);
Route::get('/tags', [MangaController::class, 'getAllTags']);
Route::get('/totalManga', [MangaController::class, 'total']);

Route::get('/comments/new', [CommentController::class, 'newest']);

Route::get('/checkManga/name/{mangaName}', [MangaController::class, 'checkMangaName']);
Route::post('/uploadFile', [FileController::class, 'uploadChapter']);
Route::post('/user/login', [UserController::class, 'login']);
Route::post('/user/register', [UserController::class, 'register']);