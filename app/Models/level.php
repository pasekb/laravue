<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class level extends Model
{
    protected $table ="levels";
    protected $primaryKey = "id";
    protected $fillable = ['id', 'nama_level'];
}
