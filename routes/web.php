<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/subject', [SubjectController::class, 'index'])->name('subject.index');
    Route::get('/subject/create', [SubjectController::class, 'create'])->name('subject.create');
    Route::post('/subject', [SubjectController::class, 'store'])->name('subject.store');
    Route::get('/subject/{id}', [SubjectController::class, 'show'])->name('subject.show');
    Route::get('/subject/{id}/edit', [SubjectController::class, 'edit'])->name('subject.edit');
    Route::put('/subject/{id}', [SubjectController::class, 'update'])->name('subject.update');
    Route::delete('/subject/{id}', [SubjectController::class, 'destroy'])->name('subject.destroy');
});

Route::get('/attendance', function() {
    return Inertia::render('Attendance');
})->name('attendance');

require __DIR__.'/auth.php';
