    import React, { useEffect } from "react";
    import { useCart } from "../Context/CartContext";
    import mockProducts from "../MockData/Data";
    import { Link } from "react-router-dom";

    const CartPage = () => {
    const { items, removeItem, updateQuantity, addItem } = useCart();

    useEffect(() => {
        if (items.length === 0) {
        mockProducts.forEach((product) => addItem(product));
        }
    }, []);

    const handleQuantityChange = (id, value) => {
        const quantity = parseInt(value);
        if (quantity > 0) {
        updateQuantity(id, quantity);
        }
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px" }}>🛒 Your Shopping Cart</h1>

        {items.length === 0 ? (
            <p>Your cart is currently empty.</p>
        ) : (
            <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                    <th style={{ textAlign: "left", padding: "10px" }}>Product</th>
                    <th style={{ textAlign: "center" }}>Price</th>
                    <th style={{ textAlign: "center" }}>Quantity</th>
                    <th style={{ textAlign: "center" }}>Subtotal</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "10px" }}>{item.name}</td>
                    <td style={{ textAlign: "center" }}>${item.price.toFixed(2)}</td>
                    <td style={{ textAlign: "center" }}>
                        <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        style={{ width: "60px" }}
                        />
                    </td>
                    <td style={{ textAlign: "center" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ textAlign: "right", marginTop: "20px" }}>
                <h2>Total: ${total.toFixed(2)}</h2>
                <Link to="/checkout">
                <button style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>
                    Proceed to Checkout
                </button>
                </Link>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default CartPage;
