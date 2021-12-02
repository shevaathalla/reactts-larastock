<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    public function definition()
    {                
        return [
            'transaction_code' => "TR".$this->faker->unique()->numberBetween($min = 1, $max = 50),
            'customer_name' => $this->faker->name(),
            'total_price' => rand(10000,2000000)
        ];
    }        
}
