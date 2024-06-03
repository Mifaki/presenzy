<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $lecturerRole = Role::where('name', 'lecturer')->first();
        $studentRole = Role::where('name', 'student')->first();

        User::create([
            'role_id' => $adminRole->id,
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'faculty' => 'Faculty of Comupter Science',
            'gender' => 'male',
            'nim' => '00000001',
        ]);

        User::create([
            'role_id' => $lecturerRole->id,
            'name' => 'Lecturer User',
            'email' => 'lecturer@lecturer.com',
            'password' => Hash::make('password'),
            'faculty' => 'Faculty of Comupter Science',
            'gender' => 'female',
            'nim' => '00000002',
        ]);

        User::create([
            'role_id' => $studentRole->id,
            'name' => 'Student User',
            'email' => 'student@student.ub.ac.id',
            'password' => Hash::make('password'),
            'faculty' => 'Faculty of Comupter Science',
            'gender' => 'male',
            'nim' => '00000003',
        ]);
    }
}
