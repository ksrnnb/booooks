<?php

use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Genre::create(['name' => 'IT']);
        App\Genre::create(['name' => 'SF']);
    }
}
