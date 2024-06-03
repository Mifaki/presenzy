<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attendance;
use App\Models\AttendanceSubmission;
use App\Models\Subject;
use App\Models\User;
use App\Models\Role;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subject = Subject::first();
        if (!$subject) {
            $this->command->warn('No subjects found. Attendance cannot be created without a subject.');
            return;
        }

        $startDateTime = now();

        for ($i = 0; $i < 3; $i++) {
            $endDateTime = $startDateTime->copy()->addMinutes(15);

            $attendance = Attendance::create([
                'subject_id' => $subject->id,
                'name' => 'Week ' . ($i + 1) . ' Attendance',
                'desc' => 'Attendance for week ' . ($i + 1),
                'start_at' => $startDateTime,
                'end_at' => $endDateTime,
            ]);

            $studentRole = Role::where('name', 'student')->first();
            $student = $studentRole ? $studentRole->users->first() : null;

            if (!$student) {
                $this->command->warn('No student found. Attendance submission cannot be created without a student.');
                return;
            }

            AttendanceSubmission::create([
                'attendance_id' => $attendance->id,
                'user_id' => $student->id,
            ]);

            $startDateTime = $endDateTime;
        }
    }
}
