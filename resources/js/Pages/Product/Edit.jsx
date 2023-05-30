import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './Partials/Navbar';
import Paginator from './Partials/Paginator';
import axios from 'axios';

export default function Edit(props) {
  const [id, setId] = useState(props.product.id);
  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('price', price);
    if (selectedFile) {
      formData.append('image', selectedFile);      
    }

    try {
      const response = await axios.post('/products/edit', formData);
      console.log(response); // handle the response as needed
    } catch (error) {
      console.error(error);
    }

    document.location.href = '/products';
  };


  return (
    <>
      <Head title="Product" />
      <Navbar />
      <div className="row m-4">
        <div class="w-full mx-auto bg-white p-8 rounded-lg">
          <div className="text-xl font-bold mb-4">Form Edit Produk</div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div class="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama Produk</label>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Produk" onChange={(name) => setName(name.target.value)} value={name} required />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Produk</label>
                <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Produk" onChange={(price) => setPrice(price.target.value)} value={price} required />
              </div>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image</label>
              <input type="file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Image" onChange={handleFileChange}/>
            </div>
            <div className="flex justify-end mt-6">
              <button type="submit" class="justify-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}