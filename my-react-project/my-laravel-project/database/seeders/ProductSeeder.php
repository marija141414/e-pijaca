<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = \App\Models\Category::all();
        
        
        foreach ($categories as $category) {
            $productNames = [
                'Milk', 
                'Bread', 
                'Eggs', 
                'Cheese', 
                'Juice',
            ];
            $productDescriptions = [
                'Fresh milk from local farms', 
                'Sliced white bread', 
                'Farm-fresh eggs', 
                'Aged cheddar cheese', 
                '100% pure orange juice',
            ];
            $productPrices = [
                1.99, 
                2.49, 
                3.99, 
                5.99, 
                2.99,
            ];
            $productImages = [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SRU5obMaQCtUqtJxr6UouLZzIDQGNRmf8wo7SB1Z_Qkv1-vFKl7rZhpFW5kGvm1K0bo&usqp=CAU',
                'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_4000,h_2250,c_limit/milk-bread.jpg',
                'https://media.istockphoto.com/id/1028690210/photo/set-of-egg-isolated.jpg?s=612x612&w=0&k=20&c=Twc1V5iG4XmGT-_6JQ7Wqejk19D_sK6OI84sxTs8W7U=',
                'https://media.istockphoto.com/id/1127471287/photo/cheese-on-white.jpg?s=612x612&w=0&k=20&c=m8kJAfayGrBoqKceiwGAq7SaEDrbZCyPzklYOm3_MBk=',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqoYpBTgbOYO7OWI6juWOhRcMQA2q9safgKbYaWmmMupcOZWbt46yEy0tDqWgwtFtVb_E&usqp=CAU',
            ];
            
            for ($i = 0; $i < 5; $i++) {
                Product::create([
                    'name' => $productNames[$i],
                    'description' => $productDescriptions[$i],
                    'price' => $productPrices[$i],
                    'image_url' => $productImages[$i],
                    'category_id' => $category->id,
                ]);
            }
        }
    }
}
