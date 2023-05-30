<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $json = File::get('database/data.json');
        $posts = json_decode($json);
        foreach ($posts as $post => $value) {
            Product::factory()->create([
                'name' => $value->name,
                'image' => $value->image,
                'price' => $value->price,
            ]);
        }
        
    }
}
