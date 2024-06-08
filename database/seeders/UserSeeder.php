<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

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

        User::factory()->create([
            'id' => $this->generateRandomId(),
            'role_id' => $adminRole->id,
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
        ]);

        User::factory()->create([
            'id' => $this->generateRandomId(),
            'role_id' => $lecturerRole->id,
            'name' => 'Lecturer User',
            'email' => 'lecturer@lecturer.com',
        ]);

        User::factory()->create([
            'id' => 'A3A84C06',
            'role_id' => $studentRole->id,
            'name' => 'Student User',
            'email' => 'student@student.ub.ac.id',
        ]);
    }

        /**
     * Generate a random ID.
     *
     * @return string
     */
    private function generateRandomId(): string
    {
        return uniqid();
    }
}
