import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from './Partials/Navbar';
import Paginator from './Partials/Paginator';
import axios from 'axios';

export default function Index(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', selectedFile);
  
      try {
        const response = await axios.post('/products', formData);
        console.log(response); // handle the response as needed
      } catch (error) {
        console.error(error);
      }

      document.location.href = '/products';
    }
  };

  // const handleSubmit = async(e) => { 
  //   const formData = new FormData();
  //   formData.append('name', name);
  //   formData.append('price', price);
  //   formData.append('image', image);

  //   await fetch(route('products.store'), {
  //     method: 'POST',
  //     body: formData,
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     alert('Error');
  //   });
    
  //   console.log(props);
  // }

  return (
    <>
      <Head title="Product" />
      <Navbar />
      <div className="grid lg:grid-cols-5 grid-cols-2 m-4">
        <div className="col-span-3 mx-2 my-2">
          <div class="w-full mx-auto bg-white p-8 rounded-lg">
            <div className="text-xl font-bold mb-4">Form Tambah Produk</div>
            <table class="min-w-full bg-white">
              <thead class="bg-gray-800 text-white ">
                <tr>
                  <th class="text-center py-3 px-4 uppercase font-semibold text-sm">No</th>
                  <th class="text-center py-3 uppercase font-semibold text-sm">Gambar</th>
                  <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Nama Produk</th>
                  <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Harga</th>
                  <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                {props.products && props.products.data.map((product, i) => 
                  <tr key={i}>
                    <td class="text-center py-3 px-4">{i+1}</td>
                    <td class="text-center py-3"><img src={props.app_url + 'assets/' + product.image} alt="Image" className="w-32 mx-auto rounded-lg"/></td>
                    <td class="text-center py-3 px-4">{product.name}</td>
                    <td class="text-center py-3 px-4">Rp {parseInt(product.price).toLocaleString()}</td>
                    <td class="text-center py-3 px-4">
                      <Link href={props.app_url + 'products/edit/' + product.id} className="mr-2 bg-blue-600 px-3 py-2 rounded-lg text-white">
                        Edit
                      </Link>
                      <Link href={props.app_url + 'products/delete/' + product.id} className="bg-red-400 px-3 py-2 rounded-lg text-white">
                        Delete
                      </Link>
                    </td>
                  </tr>  
                )}
              </tbody>
            </table>
            <div>
              <Paginator links={props.products.links} meta={props.products.meta}/>
            </div>
          </div>
        </div>
        <div className="col-span-2 mx-2 my-2">
          <div class="w-full mx-auto bg-white p-8 rounded-lg">
            <div className="text-xl font-bold mb-4">Form Tambah Produk</div>
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
                <input type="file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Image" onChange={handleFileChange} required />
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" class="justify-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}