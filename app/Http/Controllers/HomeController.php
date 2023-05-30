<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $app_url = env('APP_URL');
        return Inertia::render('Home/Index', [
            'products' => $products,
            'app_url' => env('APP_URL'),
        ]);
    }
}
