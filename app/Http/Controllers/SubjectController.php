<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display all subjects for a specific lecturer.
     */
    public function index(Request $request)
    {
        $lecturer_id = Auth::id();
        $subjects = Subject::where('lecturer_id', $lecturer_id)->get();
        return Inertia::render('Subject/Index', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Display the form to create a new subject.
     */
    public function create()
    {
        return Inertia::render('Subject/Create');
    }

    /**
     * Store a newly created subject.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'required|string'
        ]);

        $lecturerId = Auth::id();
        $isLecturer = User::where('id', $lecturerId)->where('role_id', 2)->exists();
        if (!$isLecturer) {
            abort(403, 'Unauthorized');
        }

        $validatedData['lecturer_id'] = $lecturerId;

        Subject::create($validatedData);

        return redirect()->route('subject.index')->with('message', 'Subject created successfully.');
    }

    /**
     * Display a specific subject by ID.
     */
    public function show($id)
    {
        $subject = Subject::findOrFail($id);
        return Inertia::render('Subject/Edit', [
            'subject' => $subject
        ]);
    }

    /**
     * Display the form to edit a specific subject.
     */
    public function edit($id)
    {
        $subject = Subject::findOrFail($id);
        return Inertia::render('Subject/Edit', [
            'subject' => $subject
        ]);
    }

    /**
     * Update a specific subject.
     */
    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'required|string'
        ]);

        $subject->update($validatedData);

        return redirect()->route('subject.index')->with('message', 'Subject updated successfully.');
    }

    /**
     * Delete a specific subject.
     */
    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();

        return redirect()->route('subject.index')->with('message', 'Subject deleted successfully.');
    }
}
