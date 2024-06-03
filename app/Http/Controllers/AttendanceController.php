<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Subject;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the attendance records for the user's subjects.
     */
    public function index()
    {
        $lecturerId = Auth::id();
        $attendances = Attendance::whereHas('subject', function ($query) use ($lecturerId) {
            $query->where('lecturer_id', $lecturerId);
        })->with('subject')->get();

        $attendances->transform(function ($attendance) {
            return [
                'id' => $attendance->id,
                'name' => $attendance->name,
                'desc' => $attendance->desc,
                'subject_name' => $attendance->subject->name,
                'start_at' => $attendance->start_at,
                'end_at' => $attendance->end_at,
            ];
        });

        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances,
        ]);
    }

    /**
     * Show the form for creating a new attendance record.
     */
    public function create()
    {
        $lecturerId = Auth::id();
        $subjects = Subject::where('lecturer_id', $lecturerId)->get();

        return Inertia::render('Attendance/Create', [
            'subjects' => $subjects,
        ]);
    }

    /**
     * Store a newly created attendance record in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'name' => 'required|string|max:255',
            'desc' => 'required|string',
            'start_at' => 'required|date_format:H:i',
            'end_at' => 'required|date_format:H:i',
        ]);

        $lecturerId = Auth::id();
        $subject = Subject::where('id', $validatedData['subject_id'])
            ->where('lecturer_id', $lecturerId)
            ->first();

        if (!$subject) {
            abort(403, 'Unauthorized action.');
        }

        $startDateTime = Carbon::now()->format('Y-m-d') . ' ' . $validatedData['start_at'];
        $endDateTime = Carbon::now()->format('Y-m-d') . ' ' . $validatedData['end_at'];

        $validatedData['start_at'] = $startDateTime;
        $validatedData['end_at'] = $endDateTime;

        Attendance::create($validatedData);

        return redirect()->route('attendance.index')->with('message', 'Attendance created successfully.');
    }

    /**
     * Show the form for editing the specified attendance record.
     */
    public function edit($id)
    {
        $lecturerId = Auth::id();
        $attendance = Attendance::where('id', $id)
            ->whereHas('subject', function ($query) use ($lecturerId) {
                $query->where('lecturer_id', $lecturerId);
            })->firstOrFail();

        $attendance->load('subject');
        $attendance->subject_name = $attendance->subject->name;

        $subjects = Subject::where('lecturer_id', $lecturerId)->get();

        return Inertia::render('Attendance/Edit', [
            'attendance' => $attendance,
            'subjects' => $subjects,
        ]);
    }

    /**
     * Update the specified attendance record in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'name' => 'required|string|max:255',
            'desc' => 'required|string',
            'start_at' => 'required|date_format:H:i',
            'end_at' => 'required|date_format:H:i',
        ]);

        $lecturerId = Auth::id();
        $attendance = Attendance::where('id', $id)
            ->whereHas('subject', function ($query) use ($lecturerId) {
                $query->where('lecturer_id', $lecturerId);
            })->firstOrFail();

        $startDateTime = Carbon::now()->format('Y-m-d') . ' ' . $validatedData['start_at'];
        $endDateTime = Carbon::now()->format('Y-m-d') . ' ' . $validatedData['end_at'];

        $attendance->update([
            'subject_id' => $validatedData['subject_id'],
            'name' => $validatedData['name'],
            'desc' => $validatedData['desc'],
            'start_at' => $startDateTime,
            'end_at' => $endDateTime,
        ]);

        return redirect()->route('attendance.index')->with('message', 'Attendance updated successfully.');
    }

    /**
     * Remove the specified attendance record from storage.
     */
    public function destroy($id)
    {
        $lecturerId = Auth::id();
        $attendance = Attendance::where('id', $id)
            ->whereHas('subject', function ($query) use ($lecturerId) {
                $query->where('lecturer_id', $lecturerId);
            })->firstOrFail();

        $attendance->delete();

        return redirect()->route('attendance.index')->with('message', 'Attendance deleted successfully.');
    }
}
