<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [HomeController::class, 'index']);

Route::get('/register', [AuthController::class, 'registerPage'])->name('register.view');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::get('/login', [AuthController::class, 'loginPage'])->name('login.view');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth'])->group(function () {
    Route::resource('/product', ProductController::class)->except('destroy');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::delete('/product/{products}', [ProductController::class, 'destroy'])->name('product.destroy');
});

Route::resource('transaction', TransactionController::class)->except('destroy');
Route::delete('/transaction/{transactions}', [TransactionController::class, 'destroy'])->name('transaction.destroy');
