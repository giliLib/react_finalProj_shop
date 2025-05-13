import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Tooltip } from '@mui/material';
import { useState, useEffect } from "react";

import "./ProductInCart.css";
import './ProductInDrawer.css';
import { addToCartQty, reduceQtyFromProduct, removeFromCart } from "../features/cartSlice.js";


const ProductInDrawer = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.arr);
    const initialQty = cartItems.find(item => item._id === product._id)?.qty || 1;
    const [qty, setQty] = useState(initialQty);
    const [tooltipOpen, setTooltipOpen] = useState(false); // סטייט למעקב אחרי ה-tooltip

    useEffect(() => {
        // אם הכמות שווה ל-1, מציגים את ה-tooltip למשך 2 שניות
        if (qty === 1) {
            setTooltipOpen(true);
            setTimeout(() => {
                setTooltipOpen(false); // מסתירים את ה-tooltip אחרי 2 שניות
            }, 2000);
        }
    }, [qty]); // ה-effect מתרחש כל פעם שהכמות משתנה

    const updateCart = (newQty) => {
        if (newQty > qty) {
            dispatch(addToCartQty({ ...product, qty: 1 }));
        } else if (newQty < qty) {
            if (qty === 1) {
                // במקרה של כמות 1, כפתור ההפחתה יהיה חסום ויוצג ה-tooltip
                setQty(0); // מחיקת המוצר אם הכמות היא 1
                dispatch(removeFromCart(product)); // הסרת המוצר
            } else {
                dispatch(reduceQtyFromProduct(product));
            }
        }
        setQty(newQty);
    };

    return (
        <div className="product-in-drawer">
            <div className="product-details">
                <div className="product-info">
                    <h2 className="product-name">{product.productName}</h2>
                    <span className="product-price">₪{product.price}</span>
                </div>
                <div className="quantity-controls">
                    <IconButton
                        onClick={() => updateCart(qty - 1)}
                        disabled={qty <= 1}
                    >
                        <RemoveIcon />
                    </IconButton>

                    {/* הצגת ה-tooltip ליד המספר */}
                    <Tooltip
                        title="כמות מינימלית בקניה היא 1 יחידה!"
                        open={tooltipOpen}
                        placement="top"
                        arrow
                        classes={{ tooltip: 'MuiTooltip-tooltip', arrow: 'MuiTooltip-arrow' }} // החלת מחלקות מותאמות אישית
                    >
                        <span className="quantity">{qty}</span>
                    </Tooltip>

                    <IconButton onClick={() => updateCart(qty + 1)}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div className="product-image">
                <img
                    src={`http://localhost:5500/api/images/${product.img}`}
                    alt={product.productName}
                    style={{ width: "70px", height: "70px", objectFit: "contain" }}
                />
            </div>


        </div>
    );
};

export default ProductInDrawer;
