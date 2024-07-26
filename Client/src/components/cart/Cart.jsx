import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import { MdDeleteOutline } from "react-icons/md";
import "./Cart.css";

function Cart() {
  let { currentUser } = useContext(userLoginContext);
  let [cartItems, setCartItems] = useState([]);

  //get products from cart by username
  async function getProductsOfUserCart() {
    let res = await fetch(
      `http://localhost:3000/user-cart?username=${currentUser.username}`
    );

    let cartItemsList = await res.json();
    setCartItems(cartItemsList);
  }

  //delete oroduct from cart
  async function deleteProduct(productId) {
    let res = await fetch(`http://localhost:3000/user-cart/${productId}`, {
      method: "DELETE",
    });
    console.log(res);
    getProductsOfUserCart();
  }

  useEffect(() => {
    getProductsOfUserCart();
  }, []);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="display-1 text-center text-danger">Cart is empty</p>
      ) : (
        <table className="table text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>{cartItem.id}</td>
                <td>{cartItem.title}</td>
                <td>{cartItem.price}</td>
                <td>{cartItem.brand}</td>
                <button
                  className="btn"
                  onClick={() => deleteProduct(cartItem.id)}
                >
                  <MdDeleteOutline className="text-danger fs-3" />
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
