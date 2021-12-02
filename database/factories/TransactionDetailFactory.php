<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionDetailFactory extends Factory
{
    public function definition()
    {

        $product = Product::inRandomOrder()->limit(1)->first();
        $qty = rand(10,100);

        return [
            'product_id' => $product->id,
            'quantity' => $qty,
            'price' => ($product->price * $qty),
        ];
    }
}
