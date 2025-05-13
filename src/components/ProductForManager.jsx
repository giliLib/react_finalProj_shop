import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { deleteProductById } from "../api/productService.js";
import {removeProductFromList} from '../features/productSlice.js'

const ProductForManager = ({ product,onDelete }) => {
    let currentUser=useSelector(st=>st.user.currentUser)
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            console.log("Deleting product with id:", product._id); 
            await deleteProductById(product._id,currentUser?.token);
            onDelete(product._id)
            alert("המוצר נמחק בהצלחה!");
        } catch (error) {
            console.error(error);
            console.log( error); 
            alert("שגיאה במחיקת המוצר.");
        }
    };

    return (
        <Card sx={{ maxWidth: 345, margin: '10px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
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
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" sx={{ fontSize: '1rem' }}>
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.description}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, padding: '16px' }}>
                <Button variant="contained" color="primary" fullWidth onClick={() => navigate(`/EditProduct/${product._id}`, { state: product })}>
                    עריכה
                </Button>
                <Button variant="contained" color="primary" fullWidth onClick={handleDelete}>
                    מחיקה
                </Button>
            </Box>
        </Card>
    );
};

export default ProductForManager;