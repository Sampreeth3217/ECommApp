// import { useState, useEffect, useContext } from "react";
// import { userLoginContext } from "../../contexts/userLoginContext";
// import { MdDeleteOutline } from "react-icons/md";
// import "./Cart.css";

// function Cart() {
//   const { currentUser } = useContext(userLoginContext);
//   const [cart, setCart] = useState([]);

//   // get products from cart by username
//   async function getUserCart() {
//       let res=await fetch (`http://localhost:3000/user-api/cart/${currentUser.username}`)
//       let data=await res.json();
//       setCart(data.payload.products);
//   }



//   useEffect(()=>{
//     getUserCart()
//   },[])

//   async function deleteProduct(productId) {
//     try {
//       const res = await fetch(`http://localhost:3000/user-api/user-cart/${productId}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         getUserCart();
//       } else {
//         console.error("Failed to delete product");
//       }
//     } catch (error) {
//       console.error("Failed to delete product", error);
//     }
//   }


//   return (
//     <div>
//       {cart.length === 0 ? (
//         <p className="display-1 text-center text-danger">Cart is empty</p>
//       ) : (
//         <table className="table text-center">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Price</th>
//               <th>Brand</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.map((cartItem) => (
//               <tr key={cartItem.id}>
//                 <td>{cartItem.id}</td>
//                 <td>{cartItem.title}</td>
//                 <td>{cartItem.price}</td>
//                 <td>{cartItem.brand}</td>
//                 <td>
//                   <button
//                     className="btn"
//                     onClick={() => deleteProduct(cartItem.id)}
//                   >
//                     <MdDeleteOutline className="text-danger fs-3" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Cart;

import { useState, useEffect, useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import { MdDeleteOutline } from "react-icons/md";
import "./Cart.css";

function Cart() {
  const { currentUser } = useContext(userLoginContext);
  const [cart, setCart] = useState([]);

  // Get products from cart by username
  async function getUserCart() {
    try {
      const res = await fetch(`http://localhost:3000/user-api/cart/${currentUser.username}`);
      const data = await res.json();
      setCart(data.payload.products);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.username) {
      getUserCart();
    }
  }, [currentUser]);

  // Delete product from cart
  // async function deleteProduct(productId) {
  //   try {
  //     const res = await fetch(`http://localhost:3000/user-api/user-cart/${productId}`, {
  //       method: "DELETE",
  //     });
  //     console.log(res.json());
  //     if (res.ok) {
  //       // Re-fetch the cart items to update the state
  //       getUserCart();
  //     } else {
  //       console.error("Failed to delete product");
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete product", error);
  //   }
  // }



  async function deleteProduct(productId) {
    try {
      const res = await fetch(`http://localhost:3000/user-api/user-cart/${productId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        // If needed, include the username in the body for context
        // body: JSON.stringify({ username: currentUser.username })
      });
      
      const result = await res.json(); // Await the Promise and get the result
      console.log(result); // Log the resolved result
  
      if (res.ok) {
        // Re-fetch the cart items to update the state
        getUserCart();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  }
  
  return (
    <div>
      {cart.length === 0 ? (
        <p className="display-1 text-center text-danger">Cart is empty</p>
      ) : (
        <table className="table text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem, index) => (
              <tr key={`${cartItem.id}-${index}`}>
                <td>{cartItem.id}</td>
                <td>{cartItem.title}</td>
                <td>{cartItem.price}</td>
                <td>{cartItem.brand}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteProduct(cartItem.id)}
                  >
                    <MdDeleteOutline className="text-danger fs-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Cart;