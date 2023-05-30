import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <h1 className="text-center text-2xl mt-10">Billing PDF File</h1>
      <table className='table-auto w-full font-medium mt-6'>
        <thead>
          <tr>
            <td className='pt-3 text-blue-400 text-left font-bold pl-12'>Product</td>
            <td className='pt-3 text-blue-400 text-left font-bold'></td>
            <td className='pt-3 text-blue-400 text-right font-bold pr-12'>Harga</td>
          </tr>
        </thead>
        <tbody>
          {props.cart.length > 0 ? props.cart.map((item, i) =>
            <tr key={i}>
              <td className="pt-1 text-left pl-12">{item.name}</td>
              <td className="pt-1 text-left">{item.quantity > 1 ? "x " + item.quantity : ""}</td>
              <td className="pt-1 text-right pr-12">Rp {item.totalAmount.toLocaleString()}</td>
            </tr>
          ) :
            <tr>
              <td className="py-3"></td>
              <td className="py-3">Produk Belum dipilih</td>
              <td className="py-3"></td>
            </tr>
          }

          <tr className="pb-6">
            <td className="py-2 text-left pl-12">Total:</td>
            <td className="py-2"></td>
            <td className="py-2 text-right pr-12">Rp {props.totalHarga.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});