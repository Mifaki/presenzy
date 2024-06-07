<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendance_id' ,
        'user_id',
        'status'
    ];

    public function attendance() {
        return $this->belongsTo(Attendance::class, 'attendance_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
