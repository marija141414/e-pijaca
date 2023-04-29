<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'category_id',
    ];

    public function category() //pripada kategoriji (jedan proizvod pripada jednoj kategoriji)
    {
        return $this->belongsTo(Category::class);
    }

    public function orders()  //pripada narudžbini (jedan proizvod može biti deo više narudžbina, i imaće količinu u svakoj narudžbini kojoj pripada)
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }

    public function reviews()   
    {
        return $this->hasMany(Review::class);
    }
}

