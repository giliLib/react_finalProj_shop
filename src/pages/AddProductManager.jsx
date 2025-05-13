
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { addProduct } from '../api/productService'
import { addProductAsync } from '../features/productSlice'

const AddProductManager = () => {
    let currentUser = useSelector(state => state.user.currentUser)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // פונקציה לשליחת הטופס
    const onSubmit = (data) => {
        if (currentUser && currentUser.token) {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            formData.append('file', data.image[0]);
            console.log(formData.get('file'));
            dispatch(addProductAsync({ product: formData, token: currentUser.token }))
                .unwrap()
                .then(() => {
                    console.log("מוצר נוסף בהצלחה");
                    alert("מוצר נוסף בהצלחה");
                    navigate("/ProductList");
                })
                .catch(err => {
                    console.error("שגיאה בהוספת מוצר:", err);
                    alert("שגיאה בהוספת מוצר: " + (err.response?.data?.message || "שגיאה לא ידועה"));
                });
        } else {
            console.error("אין טוקן משתמש");
            alert("אינך מחובר, או שהטוקן שלך פג תוקף.");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '600px',
                margin: '0 auto',
                padding: 2,
                backgroundColor: '#f7f7f7',
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" align="center">הוסף מוצר</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="שם המוצר"
                            variant="outlined"
                            fullWidth
                            {...register('productName', { required: 'נא להזין שם מוצר' })}
                            error={!!errors.productName}
                            helperText={errors.productName?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="תיאור"
                            variant="outlined"
                            fullWidth
                            {...register('description')}
                        />
                    </Grid>

                    {/* <Grid item xs={12}>
                        <TextField
                            label="תמונה (URL)"
                            variant="outlined"
                            fullWidth
                            {...register('imageUrl', { required: 'נא לבחור תמונה' })}
                            error={!!errors.imageUrl}
                            helperText={errors.imageUrl?.message}
                        />
                    </Grid> */}


                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="מחיר"
                            variant="outlined"
                            fullWidth
                            type="number"
                            {...register('price', { required: 'נא להזין מחיר' })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="תאריך ייצור"
                            variant="outlined"
                            fullWidth
                            type="date"
                            {...register('dateOfManufacture')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="קטגוריה"
                            variant="outlined"
                            fullWidth
                            {...register('categories')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('image', { required: 'נא לבחור תמונה' })}
                        />
                        {errors.image && <p>{errors.image.message}</p>}
                    </Grid>


                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#000',
                                '&:hover': { backgroundColor: '#333' }
                            }}
                        >
                            הוסף מוצר
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddProductManager;