<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\User;
use App\Models\Role;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch the user with the role 'Lecturer'
        $lecturerRole = Role::where('name', 'Lecturer')->first();
        $lecturer = $lecturerRole ? $lecturerRole->users->first() : null;

        if (!$lecturer) {
            $this->command->warn('No lecturer found. Subjects cannot be assigned without a lecturer.');
            return;
        }

        Subject::create([
            'lecturer_id' => $lecturer->id,
            'name' => 'Introduction to Programming',
            'desc' => 'This course provides an introduction to programming concepts and techniques.'
        ]);

        Subject::create([
            'lecturer_id' => $lecturer->id,
            'name' => 'Advanced Database Systems',
            'desc' => 'This course covers advanced topics in database systems, including database design, query optimization, and distributed databases.'
        ]);
    }
}
