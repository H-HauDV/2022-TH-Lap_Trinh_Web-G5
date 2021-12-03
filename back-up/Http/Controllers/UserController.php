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
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            $user = auth()->user();
            return response()->json(['message' => 'Login successfully', 'auth' => $user], 200);
        }

        return response()->json(['message' => 'Email or password is incorrect'], 400);

    }
    public function register(Request $request)
    {
        // $name=$request->input('name');
        // $email=$request->input('email');
        // $password=Hash::make($request->input('password'));
        $user= User::create([
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
          ]);
        return $user;

    }
}
