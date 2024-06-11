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

            if ($i === 0) {
                $kevin = User::where('name', 'Kevin Josua')->first();
                if (!$kevin) {
                    $this->command->warn('Kevin Josua not found.');
                    return;
                }

                $faiz = User::where('name', 'Ahmad Faiz Agustianto')->first();
                if (!$faiz) {
                    $this->command->warn('Ahmad Faiz Agustianto not found.');
                    return;
                }

                AttendanceSubmission::create([
                    'attendance_id' => $attendance->id,
                    'user_id' => $kevin->id,
                    'status' => 'IN',
                ]);

                AttendanceSubmission::create([
                    'attendance_id' => $attendance->id,
                    'user_id' => $faiz->id,
                    'status' => 'IN',
                ]);
            }

            $startDateTime = $endDateTime;
        }
    }
}
