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
        return Inertia::render('Welcome/Index');
    }


    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'nim' => 'required|string',
        ]);

        $user = User::where('name', $request->name)->where('nim', $request->nim)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $currentTime = now();
        $attendance = Attendance::where('start_at', '<=', $currentTime)
                                 ->where('end_at', '>=', $currentTime)
                                 ->first();

        if (!$attendance) {
            return response()->json(['message' => 'No attendance found for the current time range'], 404);
        }


        $attendanceSubmission = AttendanceSubmission::create([
            'user_id' => $user->id,
            'attendance_id' => $attendance->id,
        ]);

        return response()->json(['message' => 'Attendance submission created successfully', 'data' => $attendanceSubmission], 200);
    }
}
