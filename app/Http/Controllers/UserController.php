<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->get();

        $users->transform(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'faculty' => $user->faculty,
                'gender' => $user->gender,
                'nim' => $user->nim,
                'role_name' => $user->role->name,
            ];
        });

        return Inertia::render('User/Index', ['users' => $users]);
    }
    public function create()
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|unique:users,id,except,id',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'faculty' => 'required|string',
            'gender' => 'required|in:male,female',
            'nim' => 'required|string',
            'role_id' => 'required|exists:roles,id'
        ]);

        $validatedData['password'] = bcrypt($validatedData['password']);
        $validatedData['email_verified_at'] = now();
        $validatedData['remember_token'] = Str::random(10);

        $user = User::create($validatedData);
        $user->role_name = $user->role->name;

        return redirect()->route('user.index')->with('message', 'User created successfully.');
    }

    public function edit($id)
    {
        $user = User::with('role')->findOrFail($id);
        $userData = [
            'id' => $user->id,
            'role_id' => $user->role_id,
            'name' => $user->name,
            'email' => $user->email,
            'faculty' => $user->faculty,
            'gender' => $user->gender,
            'nim' => $user->nim,
            'role_name' => $user->role->name,
        ];

        $roles = Role::all();

        return Inertia::render('User/Edit', [
            'users' => $userData,
            'roles' => $roles
        ]);
    }
    public function update(Request $request, $id)
    {
        $user = User::with('role')->findOrFail($id);

        $validatedData = $request->validate([
            'id' => 'required|unique:users,id,except,id',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'faculty' => 'required|string',
            'gender' => 'required|in:male,female',
            'nim' => 'required|string',
            'role_id' => 'required|exists:roles,id'
        ]);

        if ($request->has('password')) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        $user->update($validatedData);
        $user->role_name = $user->role->name;

        return redirect()->route('user.index')->with('message', 'User updated successfully.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('user.index')->with('message', 'User deleted successfully.');
    }

    public function getUserById(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:users,id',
        ]);

        $user = User::with('role')->find($request->id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'faculty' => $user->faculty,
            'gender' => $user->gender,
            'nim' => $user->nim,
            'role_name' => $user->role->name,
        ];

        return response()->json($userData, 200);
    }
}
