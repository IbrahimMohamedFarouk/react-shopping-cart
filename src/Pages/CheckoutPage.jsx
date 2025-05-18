    import React, { useState } from "react";
    import { useCart } from "../Context/CartContext";
    import { useNavigate, Link } from "react-router-dom";

    const CheckoutPage = () => {
    const { items, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [error, setError] = useState("");

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleConfirmPurchase = () => {
        // تحقق بسيط للنموذج (mock validation)
        if (!cardNumber || !expiry || !cvv) {
        setError("Please fill in all payment fields.");
        return;
        }

        // لو تمام، نفضي العربة وننتقل للتأكيد
        clearCart();
        navigate("/confirmation");
    };

    if (items.length === 0) {
        return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Your cart is empty.</h2>
            <Link to="/cart">Go back to Cart</Link>
        </div>
        );
    }

    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Checkout</h1>
        <div style={{ marginBottom: "20px" }}>
            {items.map((item) => (
            <div
                key={item.id}
                style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
                }}
            >
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            ))}
        </div>
        <h2>Total: ${total.toFixed(2)}</h2>

        <h3>Payment Details (Mock)</h3>
        <div style={{ marginBottom: "10px" }}>
            <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
            onClick={handleConfirmPurchase}
            style={{
            marginTop: "30px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            }}
        >
            Confirm Purchase
        </button>
        </div>
    );
    };

    export default CheckoutPage;
