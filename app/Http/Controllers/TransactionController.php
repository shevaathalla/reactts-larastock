<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Http\Requests\Transaction\UpdateTransactionRequest;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transactions = Transaction::with('transactionDetails')->get();
        return Inertia::render('Transaction/Index', ['transactions' => $transactions]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $products = Product::all();
        return Inertia::render('Transaction/Create', ['products' => $products]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Transaction\StoreTransactionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTransactionRequest $request)
    {

        DB::beginTransaction();
        $newTransaction = new Transaction();

        $newTransaction->transaction_code = "TR" . rand(100, 900);
        $newTransaction->customer_name = $request->customer_name;
        $newTransaction->total_price = $request->total_price;

        $newTransaction->save();

        foreach ($request->transaction_details as $key => $trd) {
            $product = Product::where('id', $trd['product']['id']);

            if ($product->first()->stock < $trd['quantity']) {
                DB::rollBack();
                return redirect()->back()->with('error', 'product '.$trd['product']['name'].' running out of stock');
            }else {
                $product->update([
                    'stock' => $product->first()->stock - $trd['quantity']
                ]);                
            }
            $newTransaction->transactionDetails()->create([
                'product_id' => $trd['product']['id'],
                'quantity' => $trd['quantity'],
                'price' => $trd['price'],
            ]);
        };

        DB::commit();
        return redirect(route('transaction.index'))->with('success', 'Transaction successfully added');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        $tr = Transaction::with(['transactionDetails.product'])->where('id', $transaction->id)->first();
        return Inertia::render('Transaction/Show', ['transaction' => $tr]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Transaction\UpdateTransactionRequest  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *     
     * @return \Illuminate\Http\Response
     */
    public function destroy($transactions)
    {
        $ids = explode(',', $transactions);
        Transaction::destroy($ids);
        return redirect(route('transaction.index'))->with('success','Transaction successfully deleted');
    }
}
