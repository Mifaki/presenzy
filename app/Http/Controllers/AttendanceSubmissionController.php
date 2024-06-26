<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Attendance;
use App\Models\AttendanceSubmission;
use Inertia\Inertia;

class AttendanceSubmissionController extends Controller
{
    public function index(Request $request)
    {
        $submissions = AttendanceSubmission::with(['user', 'attendance.subject'])
            ->get()
            ->map(function ($submission) {
                return [
                    'id' => $submission->id,
                    'status' => $submission->status,
                    'created_at' => $submission->created_at,
                    'user_name' => $submission->user->name,
                    'user_nim' => $submission->user->nim,
                    'subject_name' => $submission->attendance->subject->name,
                ];
            });

        return Inertia::render('AttendanceSubmission/Index', [
            'submissions' => $submissions,
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'nim' => 'required|string',
        ]);

        $user = User::where('name', $request->name)->where('nim', $request->nim)->first();

        if (!$user) {
            return response()->json(['message' => 'User tidak valid!'], 404);
        }

        $currentTime = now();
        $attendance = Attendance::where('start_at', '<=', $currentTime)
                                 ->where('end_at', '>=', $currentTime)
                                 ->first();

        if (!$attendance) {
            return response()->json(['message' => 'Tidak ada absensi saat ini'], 404);
        }

        $latestSubmission = AttendanceSubmission::where('user_id', $user->id)
                                                ->where('attendance_id', $attendance->id)
                                                ->orderBy('created_at', 'desc')
                                                ->first();

        $status = $latestSubmission && $latestSubmission->status === 'IN' ? 'OUT' : 'IN';

        $attendanceSubmission = AttendanceSubmission::create([
            'user_id' => $user->id,
            'attendance_id' => $attendance->id,
            'status' => $status,
        ]);

        return response()->json(['message' => 'Absensi berhasil! (' . $status . ')', 'data' => $attendanceSubmission], 200);
    }
}
