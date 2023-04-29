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
                'https://cdn.pixabay.com/photo/2017/08/14/18/11/steamed-milk-2633963_1280.jpg', 
                'https://cdn.pixabay.com/photo/2018/09/22/13/50/bread-3696101_1280.jpg', 
                'https://cdn.pixabay.com/photo/2018/03/21/00/14/eggs-3241286_1280.jpg', 
                'https://cdn.pixabay.com/photo/2018/06/27/16/05/cheese-3500102_1280.jpg', 
                'https://cdn.pixabay.com/photo/2018/04/11/22/08/juice-3318162_1280.jpg',
            ];
            
            for ($i = 0; $i < count($productNames); $i++) {
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
