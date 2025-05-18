    import React, { createContext, useContext, useReducer } from "react";

    // Initial state
    const initialState = {
    items: [],
    };

    // Reducer function
    function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM":
        {
            const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
            return {
            ...state,
            items: state.items.map(item =>
                item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            };
        }
        return {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }],
        };
        }

        case "REMOVE_ITEM":
        return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload),
        };

        case "UPDATE_QUANTITY":
        return {
            ...state,
            items: state.items.map(item =>
            item.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
            ),
        };

        case "CLEAR_CART":
        return initialState;

        default:
        return state;
    }
    }

    // Create Context
    const CartContext = createContext();

    // Custom hook
    export const useCart = () => useContext(CartContext);

    // Provider component
    export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Actions
    const addItem = item => dispatch({ type: "ADD_ITEM", payload: item });
    const removeItem = id => dispatch({ type: "REMOVE_ITEM", payload: id });
    const updateQuantity = (id, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    return (
        <CartContext.Provider
        value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart }}
        >
        {children}
        </CartContext.Provider>
    );
    };
