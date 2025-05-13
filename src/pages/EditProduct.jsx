import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardMedia, Typography, Button, Box, TextField, Container } from '@mui/material';
import { updatProduct } from '../api/productService'; // וודא שהייבוא נכון

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    let product = useLocation().state;
    let currentUser = useSelector(state => state.user.currentUser);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (product) {
            setValue('productName', product.productName);
            setValue('description', product.description);
            setValue('price', product.price);
            setValue('categories', product.categories.join(',')); // שמירת הקטגוריות כמחרוזת מופרדת בפסיקים
        }
    }, [product, setValue]);

    const onSubmit = async (data) => {
        const updatedProduct = {
            productName: data.productName,
            description: data.description,
            price: Number(data.price),  // המרת המחיר למספר
            categories: data.categories.split(',').map(category => category.trim()) // המרת המחרוזת למערך וניקוי רווחים
        };

        try {
            await updatProduct(product._id, updatedProduct, currentUser.token);
            alert('המוצר עודכן בהצלחה!');
            // navigate('/ProductForManager');
            navigate('/ProductForManager', { replace: true });

        } catch (error) {
            console.error('שגיאה בעדכון המוצר:', error.response?.data || error.message);
            alert('שגיאה בעדכון המוצר.');
        }
    };

    if (!product) {
        return <div>טוען...</div>;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    עריכת מוצר
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                    {/* כרטיס התמונה */}
                    <Card sx={{ maxWidth: 400 }}>
                        <CardMedia>
                            <img
                                src={`http://localhost:5500/api/images/${product?.img}`}
                                alt={product?.productName}
                                style={{
                                    width: "100%",
                                    maxHeight: "300px",
                                    objectFit: "contain",
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {product.productName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* טופס העדכון */}
                    <Box sx={{ flex: 1 }}>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField label="שם מוצר" {...register('productName', { required: true })} fullWidth margin="normal" />
                            <TextField label="תיאור" {...register('description')} fullWidth margin="normal" />
                            <TextField label="מחיר" {...register('price', { required: true })} fullWidth margin="normal" type="number" />
                            <TextField label="קטגוריות (מופרדות בפסיקים)" {...register('categories')} fullWidth margin="normal" />

                            {/* כפתור ממורכז */}
                                <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
                                    עדכן מוצר
                                </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default EditProduct;
