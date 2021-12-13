<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
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
}
