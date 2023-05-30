import React, {useState, useEffect, useRef} from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './Partials/Navbar';
import { ComponentToPrint } from './Partials/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

export default function Index(props) {
  
  const [totalHarga, setTotalHarga] = useState(0);
  const [cart, setCart] = useState([]);
  const [showModalSavedBill, setShowModalSavedBill] = useState(false);
  const [showModalChargeBill, setShowModalChargeBill] = useState(false);
  const [showModalPayBill, setShowModalPayBill] = useState(false);
  const [kembalian, setKembalian] = useState("Masukkan Uang Pembayaran");

  function addProductToCart(product) {
    let findProductInCart = cart.find(i => {
      return i.id == product.id;
    });

    if (cart.length > 0 && findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach(item => {
        if(item.id == product.id) {
          newItem = { 
            ...item,
            quantity: item.quantity + 1,
            totalAmount: ((item.quantity + 1) * parseInt(item.price))
          }
          newCart.push(newItem);
        } else {
          newCart.push(item);
        }
      });
      setCart(newCart);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: parseInt(product.price)
      }
      setCart([...cart, addingProduct]);
    }
  }

  const handlerClearCart = () => {
    setCart([]);
  }

  const handleClickModalSavedBill = () => {
    setShowModalSavedBill(!showModalSavedBill);
  };
  
  const handleClickModalChargeBill = (totalHarga) => {
    if (totalHarga > 0) {
      setShowModalChargeBill(!showModalChargeBill);
    }
  };

  const handleClickModalPayBill = () => {
    const inputKembalian = document.querySelector('#inputKembalian').value;
    if (inputKembalian >= totalHarga) {
      setShowModalPayBill(!showModalPayBill);
      setShowModalChargeBill(!showModalChargeBill);
      setCart([]);
    }
  };

  const handleClickModalClosePayBill = () => {
    setShowModalPayBill(!showModalPayBill);
  };

  const handleKembalian = (e) => {
    const inputKembalian = e.target.value;
    let teksKembalian = "";

    if (inputKembalian >= totalHarga) {
      teksKembalian = "Kembalian: Rp " + (inputKembalian - totalHarga).toLocaleString('id');
    } else {
      teksKembalian = "Uang Kurang Rp " + (totalHarga - inputKembalian).toLocaleString('id');
    }
    setKembalian(teksKembalian);
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => { 
    handleReactToPrint();
  }
  
  useEffect(() => {
    console.log(cart);
    const total = cart.reduce((total, item) => total + parseInt(item.totalAmount), 0);
    setTotalHarga(total);
  })

  return (
    <>
      <Head title="Product" />
      <Navbar />
      <div className="grid md:grid-cols-2 grid-cols-1 text-center mt-4">
        {/* Product Section */}
        <div className="grid grid-cols-4 md:mt-2 text-center mx-4 min-w-[0] h-[500px] items-stretch">
          {props.products ? props.products.map((product, i) => {
          return (
            <div className="mx-2 my-2 rounded-lg hover:cursor-pointer hover:shadow-xl hover:border-2" key={i} onClick={() => addProductToCart(product)}>
              <div className="bg-white shadow-md rounded-lg">
                <img src={props.app_url + 'assets/' + product.image} alt="Image" className="w-full rounded-t-lg"/>
                {/* <img src="https://source.unsplash.com/random/480x270/?fruit" alt="Image" className="w-full rounded-t-lg"/> */}
                <h3 className="py-2 md:text-[12px] text-[10px] font-semibold">{product.name}</h3>
              </div>
            </div>
          );
        }) : "Produk Kosong"}
        </div>
        {/* Bill Section*/}
        <div className="mx-4 md:mt-4 mt-[70px] px-1">
          {/* TopBar Billing - New Customer */}
          <div className="grid grid-cols-5 items-center text-center bg-blue-200">
            <div className="bg-blue-400 flex flex-col items-center justify-center text-blue-900 py-3 rounded-l">
              <div className="flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-900 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                </svg>
              </div>
              <div className="font-semibold text-sm mt-1">Customer</div>
            </div>
            <div className="col-span-3 text-4xl font-bold">New Customer</div>
            <div className="logo-billing flex flex-col items-center justify-center bg-blue-400 h-full text-blue-900 rounded-r">
              <div className="flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-900 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
                </svg>
              </div>
              <div className="font-semibold text-sm mt-1">Billing List</div>
            </div>
          </div>
          {/* Dine In */}
          <div className="flex items-center justify-center bg-white py-3 mt-1 rounded-sm">
            <span>Dine In</span>
            <span>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </span>
          </div>
          {/* List Billing */}
          <div className="bg-white mt-1 rounded-sm">
            <table className='table-auto w-full font-medium'>
              <thead>
                <tr>
                  <td className='pt-3 text-blue-400 text-left pl-12'>Product</td>
                  <td className='pt-3 text-blue-400 text-left'></td>
                  <td className='pt-3 text-blue-400 text-right pr-12'>Harga</td>
                </tr>
              </thead>
              <tbody>
                { cart.length > 0 ? cart.map((item, i) =>
                  <tr key={i}>
                    <td className="pt-1 text-left pl-12">{item.name}</td>
                    <td className="pt-1 text-left">{item.quantity > 1 ? "x " + item.quantity : ""}</td>
                    <td className="pt-1 text-right pr-12">Rp {item.totalAmount.toLocaleString()}</td>
                  </tr>
                ): 
                  <tr>
                    <td className="py-3"></td>
                    <td className="py-3">Produk belum dipilih</td>
                    <td className="py-3"></td>
                  </tr>
                }
                
                <tr>
                  <td className="py-2 text-left pl-12">Total:</td>
                  <td className="py-2"></td>
                  <td className="py-2 text-right pr-12">Rp {totalHarga.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Clear Sale */}
          <div className="bg-white mt-1 rounded-sm hover:cursor-pointer text-slate-500 hover:text-slate-900">
            <div className="py-3 font-semibold" onClick={() => handlerClearCart()}>Clear Sale</div>
          </div>
            {/* Save Bill - Print Bill & Charge */}
          <div className="mt-1">
            <div className="bg-white rounded-t">
              &nbsp;
            </div>
            {/* Save Bill - Print Bill */}
            <div className="bg-blue-400">
              <div className="grid grid-cols-2 text-center text-2xl font-bold">
                <div className="py-4 border-r-4 text-slate-800 hover:cursor-pointer hover:text-black" onClick={handleClickModalSavedBill}>Save Bill</div>
                <div className="py-4 text-slate-800 hover:cursor-pointer hover:text-black" onClick={handlePrint}>Print Bill</div>
                <div style={{ display:"none" }}>
                  <ComponentToPrint cart={cart} totalHarga={totalHarga} ref={componentRef}/>
                </div>
              </div>
            </div>
            {/* Charge */}
            <div className="bg-blue-900 rounded-b">
              <div className="grid grid-cols-5 text-center items-center">
                <div className="border-r-4 py-4 flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
                  </svg>
                  <span className="text-white font-medium">Split</span>
                </div>
                <div className="col-span-4 font-semibold text-4xl text-white hover:cursor-pointer hover:text-black" onClick={() => handleClickModalChargeBill(totalHarga)}>Charge Rp {totalHarga.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalSavedBill && (
       <div className="modal">
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <h1 className="mb-4 text-3xl font-extrabold text-center">Saved!</h1>
                  <p className="text-gray-600 text-center">Bill berhasil disimpan ke dalam database.</p>
                </div>
                <div className="space-y-4">
                  <button className="p-3 bg-black rounded-full text-white w-full font-semibold" onClick={handleClickModalSavedBill}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> )}
      {showModalChargeBill && (
       <div className="modal">
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-4">
                  <h1 className="mb-2 text-3xl font-extrabold text-center">Charge!</h1>
                  <div className="mt-2">
                      <label class="text-sm text-navy-700 dark:text-white font-bold pl-2">Bayar</label>
                      <input type="number" id="inputKembalian" className="mt-1 flex h-12 w-full items-center justify-center rounded-full border bg-white/0 p-3 text-sm outline-none border-gray-200" placeholder="Total Bayar" onChange={handleKembalian}/>
                  </div>
                  <div className="mt-2">
                      <label class="text-sm text-navy-700 dark:text-white font-bold pl-2">Total Harga Biling</label>
                      <input type="text" className="mt-1 flex h-12 w-full items-center justify-center rounded-full border bg-slate-300 p-3 text-sm outline-none border-black" placeholder="Harga" value={"Rp " + totalHarga.toLocaleString('id')} disabled/>
                  </div>
                  
                  <p className="mt-2 text-gray-600 text-center">{kembalian}</p>
                </div>
                <div>
                  <button className="p-3 bg-black rounded-full text-white w-full font-semibold" onClick={() => handleClickModalPayBill()}>Bayar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> )}
      {showModalPayBill && (
       <div className="modal">
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <h1 className="mb-4 text-3xl font-extrabold text-center">Berhasil!</h1>
                  <p className="text-gray-600 text-center">Bill berhasil dibayar, terima kasih..</p>
                </div>
                <div className="space-y-4">
                  <button className="p-3 bg-black rounded-full text-white w-full font-semibold" onClick={handleClickModalClosePayBill}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> )}
    </>
  );
}