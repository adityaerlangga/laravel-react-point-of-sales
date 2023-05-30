<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductsCollection;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = new ProductsCollection(Product::orderBy('created_at', 'desc')->paginate(5));

        return Inertia::render('Product/Index', [
            'products' => $products,
            'app_url' => env('APP_URL'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('assets'), $imageName);

            Product::create([
                'name' => $request->name,
                'price' => $request->price,
                'image' => $imageName,
            ]);

            return redirect()->back()->with('message', 'Product berhasil disimpan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::find($id);
        return Inertia::render('Product/Edit', [
            'product' => $product,
            'app_url' => env('APP_URL'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product = Product::find($request->id);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('assets'), $imageName);
        } else {
            $imageName = $product->image;
        }

        Product::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'price' => $request->price,
                'image' => $imageName,
            ]);

        return redirect()->back()->with('message', 'Product berhasil disimpan');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return redirect()->back()->with('message', 'Product berhasil dihapus');
    }
}
