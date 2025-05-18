import React from "react";
import { Link } from "react-router-dom";

const ConfirmationPage = () => {
    return (
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <h1>Thank you for your purchase!</h1>
        <p>Your order has been successfully placed.</p>
        <Link to="/" style={{ marginTop: "20px", display: "inline-block", textDecoration: "none", color: "#007bff" }}>
            Go back to Home
        </Link>
        </div>
    );
};

export default ConfirmationPage;
