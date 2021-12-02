<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{   
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->colorName,
            'stock' => rand(10,100),
            'price' => rand(1000,100000)
        ];
    }
}
