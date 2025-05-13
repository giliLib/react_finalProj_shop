import { useSelector } from "react-redux";
import ProductInDrawer from "./ProductInDrawer.jsx";
import { Box, Typography, Badge, Paper, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";


const ProductDrawerCart = () => {
    let arr = useSelector(st => st.cart.arr);
    const cartItemsCount = useSelector(state => state.cart.totalSum);

    // חישוב סה"כ מחיר וסה"כ מוצרים ייחודיים
    const totalPrice = arr.reduce((total, product) => total + (product.price * product.qty), 0);
    const totalSum = arr.length; // מספר המוצרים הייחודיים

    return (
        <Box>
            {arr.length > 0 ? (
                <Box>
                    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="subtitle1" style={{ marginRight: '15px' }}>
                                ₪ {totalPrice.toFixed(2)}
                            </Typography>
                            <IconButton color="inherit" component={Link} to="ProductCartList">
                                <Badge badgeContent={cartItemsCount} color="error">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Paper>
                    {arr.map((product) => (
                        <ProductInDrawer key={product._id} product={product} />
                    ))}
                </Box>
            ) : (
                <Typography>הסל שלך ריק </Typography>
            )}
        </Box>
    );
}

export default ProductDrawerCart;