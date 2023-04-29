<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();
        $users = [
            [
                'name' => 'Marija',
                'email' => 'marija@example.com',
                'password' => Hash::make('marija'),
            ],
            [
                'name' => 'Jelena',
                'email' => 'jelena@example.com',
                'password' => Hash::make('jelena'),
            ],
            [
                'name' => 'Jovana',
                'email' => 'jovana@example.com',
                'password' => Hash::make('jovana'),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
        $this->call(CategorySeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(ReviewSeeder::class);


        //php artisan migrate:fresh --seed
        //Ova komanda briše sve tabele u bazi podataka i ponovo kreira tabele definisane u migracijama, a zatim pokreće seeder-e da bi se popunile tabele sa podacima
    }
}
