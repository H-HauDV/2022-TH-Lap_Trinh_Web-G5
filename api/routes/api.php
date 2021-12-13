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
Route::get('/manga/carousel', [MangaController::class, 'getCarosel']);
Route::get('/manga/tags', [MangaController::class, 'getAllTags']);
Route::get('/manga/total', [MangaController::class, 'total']);
Route::get('/manga/homePage', [MangaController::class, 'getMangaForHomePage']);
Route::get('/manga/get/all/withPagination/', [MangaController::class, 'getAllMangaWithPagination']);
Route::get('/manga/get/mangaInfor/fromID/{id}', [MangaController::class, 'getFromID']);

Route::get('/manga/get/mangaName/fromChapterID/{id}', [MangaController::class, 'getMangaNameFromChapterID']);
Route::get('/manga/search/suggestion/fromName/{mangaName}', [MangaController::class, 'getSearchSuggestionFromName']);
Route::get('/mangaTags/{id}', [MangaController::class, 'getTagFromID']);
Route::get('/mangaViewCount/{id}', [MangaController::class, 'getViewCountFromID']);
Route::get('/manga/get/chapterList/{id}', [MangaController::class, 'getChapterFromID']);
Route::get('/chapterImageList/{id}', [MangaController::class, 'getImageFromChapterID']);
Route::get('/getNextChapter/{chapterID}', [MangaController::class, 'getNextChapter']);
Route::get('/getPrevChapter/{chapterID}', [MangaController::class, 'getPrevChapter']);


Route::get('/comments/new', [CommentController::class, 'newest']);
Route::get('/comments/chapter/{id}', [CommentController::class, 'getCommentOfChapter']);

Route::get('/checkManga/name/{mangaName}', [MangaController::class, 'checkMangaName']);
Route::post('/uploadFile', [FileController::class, 'uploadChapter']);
Route::post('/user/login', [UserController::class, 'login']);
Route::post('/user/register', [UserController::class, 'register']);
Route::get('/user/checkEmailDuplication/{email}', [UserController::class, 'checkUserEmailExistance']);

Route::get('/user/getInfoByID/basic/{id}', [UserController::class, 'getBasicInfoFromID']);

Route::get('/user/getInfoByID/advanced/{id}', [UserController::class, 'getAdvancedInfoFromID']);
Route::get('/user/getInfoByID/changeable/{id}', [UserController::class, 'getChangeableInfoFromID']);
