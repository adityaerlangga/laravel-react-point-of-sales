<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
Route::get('/products/delete/{id}', [ProductController::class, 'destroy']);
Route::get('/products/edit/{id}', [ProductController::class, 'edit']);
Route::post('/products/edit', [ProductController::class, 'update'])->name('products.update');

Route::get('/test', function () {
    dd("Hai");
})->name('test');

require __DIR__.'/auth.php';
