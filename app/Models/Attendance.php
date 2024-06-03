<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id' ,
        'name',
        'desc',
        'start_at',
        'end_at',
    ];

    public function subject() {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function attendanceSubmission() {
        return $this->hasMany(AttendanceSubmission::class);
    }
}
