import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Drawer, Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProductDrawerCart from './ProductDrawerCart.jsx';
import { addToCartQty } from "../features/cartSlice.js";



const Product = ({ product }) => {
    let disp = useDispatch();
    let arr = useSelector(st => st.cart.arr);
    let prev = useRef(arr.find(item => item._id === product._id)?.qty || 0);
    const [qty, setQty] = useState(arr.find(item => item._id === product._id)?.qty || 1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const timerRef = useRef(null);

    const startCloseTimer = () => {
        timerRef.current = setTimeout(() => {
            setOpenDrawer(false);
        }, 5000);
    };

    const stopCloseTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    useEffect(() => {
        if (openDrawer) {
            startCloseTimer();
        }
        return () => stopCloseTimer();
    }, [openDrawer]);

    return (

        <Card sx={{
            // minWidth: "300px",
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: "border 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // אנימציה חלקה
            border: "2px solid transparent", // מסגרת שקופה כברירת מחדל
            "&:hover": {
                border: "2px solid #1976d2", // מסגרת כחולה בעת מעבר עכבר
                borderRadius: "8px", // עיגול פינות קל
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" // צל עדין להבלטה
            }
        }}>
            <CardMedia
                component="img"
                sx={{
                    height: "50%",
                    objectFit: "contain",
                    width: "50%",
                    display: "flex", // הוסף את השורה הזו
                    justifyContent: "center", // הוסף את השורה הזו
                    alignItems: "center", // הוסף את השורה הזו
                }}
                image={`http://localhost:5500/api/images/${product.img}`}
                alt={product.productName}
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    <Link to={`ProductDetails/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {product.productName}
                    </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            {/* כפתורים ממוקמים בתחתית */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            let newQty = qty;
                            if (qty > prev.current) {
                                newQty -= prev.current;
                            } else {
                                newQty = qty - prev.current;
                            }
                            prev.current = qty;
                            disp(addToCartQty({ ...product, qty: newQty }));
                            setOpenDrawer(true);
                        }}
                    >
                        הוספה
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => setQty(qty + 1)}>
                            <AddIcon />
                        </IconButton>
                        <Typography sx={{ margin: '0 10px' }}>{qty}</Typography>
                        <IconButton disabled={qty === 1} onClick={() => setQty(qty - 1)}>
                            <RemoveIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <Box
                    sx={{ width: 300, padding: 2 }}
                    onMouseEnter={stopCloseTimer}
                    onMouseLeave={startCloseTimer}
                >
                    <h2> סל הקניות שלך</h2>
                    <ProductDrawerCart />
                </Box>
            </Drawer>
        </Card>



    );
};

export default Product;