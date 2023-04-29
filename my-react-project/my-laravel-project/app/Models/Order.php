<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'user_id',
        'items',
    ];

    protected $casts = [  //  čuvanje više proizvoda za svaku narudžbinu
        'items' => 'json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
