import { useNavigate, useParams } from "react-router-dom";
import { Modal, Box, Typography, IconButton, Grid, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { getProductById } from "../api/productService.js";
import "./ProductDetails.css";
import LinearProgress from '@mui/material/LinearProgress';

const ProductDetails = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const response = await getProductById(id);
                console.log(response.data);
                setProductDetails(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(err);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    return (
        <Modal
            open={true}
            onClose={() => navigate("/ProductList")}
            aria-labelledby="product-details-modal"
            aria-describedby="product-details-description"
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: "80%", md: "70%" }, // הגדלת רוחב המודל
                maxWidth: "800px", // הגדלת רוחב מקסימלי
                bgcolor: "background.paper",
                boxShadow: 10, // צל קל יותר
                p: 4,
                borderRadius: "16px", // פינות מעוגלות יותר
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: '1px solid #e0e0e0', // גבול דק
                gap: 3, // יותר רווח
            }}>
                {loading ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3} alignItems="center">
                        {/* טקסט */}
                        <Grid item xs={12} md={6} textAlign="left">
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, marginBottom: 2, letterSpacing: '0.5px' }}>
                                {productDetails?.productName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2, lineHeight: '1.6' }}>
                                {productDetails?.description}
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                        ₪{productDetails?.price}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/ProductList`)}
                                        sx={{ padding: "12px 24px", borderRadius: '8px', fontWeight: 600, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
                                    >
                                        הוסף לסל
                                    </Button> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* תמונה */}
                        <Grid item xs={12} md={6} textAlign="right">
                            <img
                                src={`http://localhost:5500/api/images/${productDetails?.img}`}
                                alt={productDetails?.productName}
                                style={{
                                    maxWidth: "100%", // תמונה ממלאה את הרוחב של הגריד
                                    maxHeight: "350px", // הגבלת גובה תמונה
                                    objectFit: "contain",
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Grid>
                        {/* כפתור סגירה */}
                        <IconButton
                            onClick={() => navigate("/ProductList")}
                            sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                color: "#888",
                                '&:hover': {
                                    color: "#000"
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                )}
            </Box>
        </Modal>
    );
};

export default ProductDetails;