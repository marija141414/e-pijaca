<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::first();
        $product = Product::first();
        Review::create([
            'rating' => 5,
            'comment' => 'Odličan proizvod, preporučujem svima!',
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        $user = User::find(2);
        $product = Product::find(2);
        Review::create([
            'rating' => 4,
            'comment' => 'Dobar proizvod, ali malo skuplji od konkurencije.',
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        $user = User::find(3);
        $product = Product::find(3);
        Review::create([
            'rating' => 2,
            'comment' => 'Proizvod je veoma lošeg kvaliteta.',
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }
}
