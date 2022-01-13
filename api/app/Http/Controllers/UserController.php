<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function login(Request $request)
    {
        $user= User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message' =>  "Email or password not matched"],  400);
        }
        return response()->json(['type' =>  "user", 'id'=> $user->id],  200);

    }
    public function register(Request $request)
    {
        $user= User::create([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
          ]);
        // return $user;
        return response()->json(['type' =>  "user", 'id'=> $user->id],  200);
    }
    public function checkUserEmailExistance($UserEmail)
    {
        $isExist=  User::where('email', '=', $UserEmail)->first();
        if ($isExist === null) {
            // Email does not exist
            return 0;
          } else {
            // Email exits
            return 1;
          }
    }
    public function getBasicInfoFromID($id)
    {
        return User::select('name', 'avatar')->where('id', $id)->first();
    }
    public function getAdvancedInfoFromID($id)
    {
        return User::select('*')->where('id', $id)->first();
    }
    public function getChangeableInfoFromID($id)
    {
        return User::select('name','fullName','gender', 'email','address','selfDescription')->where('id', $id)->first();
    }
    public function updateUserInfor(Request $request)
    {
        $user = User::find( $request->id);
        $user->name = $request->username;
        $user->fullName = $request->fullname;
        $user->gender = $request->gender;
        $user->address = $request->location;
        $user->selfDescription = $request->description;
        $user->save();
    }
    public function getUserHistory($id)
    {
        $userId= $id;
        return DB::select("SELECT mangas.name as mangaName, 
        chapter_manga.chapter_count as chapterCount,
        history.chapter_id as chapterId, 
        history.read_date as readDate,
        mangas.main_image as mangaImage,
        mangas.id as mangaId
        from history, chapter_manga, mangas 
        where  chapter_manga.manga_id= mangas.id and history.chapter_id=chapter_manga.chapter_id
        and history.user_id=$userId ");
    }
}
