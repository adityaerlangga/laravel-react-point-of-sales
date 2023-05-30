import React, {useState, useEffect} from 'react';

export default function Product(props) {
  const [cart, setCart] = useState([]);

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
            totalAmount: parseInt(item.totalAmount) + parseInt(item.price)
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
        totalAmount: product.price
      }
      setCart([...cart, addingProduct]);
    }
    props.updateCartParent(cart);
  }

  return (
    <>
      
    </>
  );
}
