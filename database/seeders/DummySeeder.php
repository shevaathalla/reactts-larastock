<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Database\Seeder;

class DummySeeder extends Seeder
{
    public function run()
    {
        Product::factory(10)->create();

        for ($i=0; $i < 3 ; $i++) {             
            $transaction = Transaction::factory()->create();
            $transaction_details = TransactionDetail::factory()->count(3)->for($transaction)->create();
            
            $transaction->total_price = array_sum($transaction_details->pluck('price')->toArray());
            $transaction->save();
        }
    }
}
