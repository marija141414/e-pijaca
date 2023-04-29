<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         
        $users = User::all();
        $products = Product::all();

     
        for ($i = 1; $i <= 3; $i++) {
            $order = Order::create([
                'status' => 'pending',
                'user_id' => $users->random()->id,
                'items' => $products->random(rand(1, 5))->pluck('id')->toArray(),
            ]);
            
            
        }
    }
}
