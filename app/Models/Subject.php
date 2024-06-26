<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'lecturer_id',
        'name',
        'desc'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'lecturer_id');
    }

    public function attendance() {
        return $this->hasMany(Attendance::class);
    }
}
