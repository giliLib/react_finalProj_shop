import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Typography, Grid } from '@mui/material';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import "./ProductInCart.css";
import { addToCartQty, reduceQtyFromProduct, removeFromCart } from "../features/cartSlice.js";


const ProductInCart = ({ product }) => {
    let disp = useDispatch();
    let arr = useSelector(st => st.cart.arr);
    let prev = useRef(arr.find(item => item._id === product._id)?.qty || 0);
    const [qty, setQty] = useState(arr.find(item => item._id === product._id)?.qty || 1);

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
            <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>תמונה</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>שם מוצר</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>מחיר</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>כמות</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>סה"כ</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>פעולות</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ padding: '8px' }}>
                        <img src={product.img} alt={product.productName} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                    </td>
                    <td style={{ padding: '8px' }}>
                        <Link to={"ProductDetails/" + product._id} className="product-link">
                            <Typography component="div" variant="h6">
                                {product.productName}
                            </Typography>
                        </Link>
                    </td>
                    <td style={{ padding: '8px' }}>
                        <Typography variant="body1">{product.price} ש"ח</Typography>
                    </td>
                    <td style={{ padding: '8px' }}>
                        <Typography variant="body1">{qty}</Typography>
                    </td>
                    <td style={{ padding: '8px' }}>
                        <Typography variant="body1">{product.price * qty} ש"ח</Typography>
                    </td>
                    <td style={{ padding: '8px' }}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <IconButton aria-label="הסר מהסל" onClick={() => disp(removeFromCart(product))}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="הוסף לסל" onClick={() => {
                                    let newQty = qty > prev.current ? qty - prev.current : qty - prev.current;
                                    prev.current = qty;
                                    disp(addToCartQty({ ...product, qty: newQty }));
                                }}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default ProductInCart;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {addToCart,addToCartQty,reduceQtyFromProduct,removeFromCart,getFromCartPriceAndQty}from '../features/cartSlice'
// import { useNavigate } from "react-router-dom";
// import CheckOut from '../pages/CheckOut'

// const ProductInCart = () => {
//   let currentCart = useSelector((state) => state.cart.arr);
//   let totalPrice = useSelector((state) => state.cart.totalSum);
//   let dispatch = useDispatch();
//   let navig = useNavigate();
//   const [openCheckout, setOpenCheckout] = useState(false);

//   return (
//     <Box display="flex" flexDirection="row-reverse" justifyContent="space-between" p={3}>
//       {/* טבלת המוצרים - בצד ימין */}
//       <Box flex={2} ml={3}>
//         <Typography variant="h4" gutterBottom>
//           סל הקניות שלך
//         </Typography>
//         {currentCart.length === 0 ? (
//           <Typography>הסל שלך ריק</Typography>
//         ) : (
//           <TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
//             <Table sx={{ direction: "rtl" }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center">מוצר</TableCell>
//                   <TableCell align="center">מחיר</TableCell>
//                   <TableCell align="center">כמות</TableCell>
//                   <TableCell align="center">סכום ביניים</TableCell>
//                   <TableCell align="center"></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentCart.map((item) => (
//                   <TableRow key={item._id}>
//                     <TableCell align="center">
//                       <Box display="flex" flexDirection="row" alignItems="center">
//                         <img src={"images/" + item.url} alt={item.name} width={50} height={50} />
//                         <Box ml={1} textAlign="center">
//                           <Typography variant="body1" fontWeight="bold">
//                             {item.name}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="center">₪{item.price.toFixed(2)}</TableCell>
//                     <TableCell align="center">
//                       <TextField
//                         type="number"
//                         size="small"
//                         onChange={(e) => {
//                           if (e.target.value > item.qty) dispatch(addToCart(item));
//                           else dispatch(reduceQtyFromProduct(item));
//                         }}
//                         defaultValue={item.qty}
//                         inputProps={{
//                           min: 1,
//                           step: 1,
//                         }}
//                         sx={{ width: 60 }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">₪{(item.price * item.qty).toFixed(2)}</TableCell>
//                     <TableCell align="center">
//                       <IconButton color="error">
//                         <DeleteIcon onClick={() => {
//                           dispatch(removeFromCart(item));
//                         }} />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {currentCart.length > 0 && (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center" fontWeight="bold">משלוח</TableCell>
//                     <TableCell align="center">₪50.00</TableCell>
//                     <TableCell></TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>

//       {/* סיכום סל הקניות - בצד שמאל */}
//       <Box flex={1}>
//         <Card sx={{ bgcolor: "#E3F6FC", p: 2, borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="right">
//               סה"כ בסל הקניות
//             </Typography>
//             <Divider sx={{ my: 1 }} />
//             <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }} textAlign="right">
//               משלוח
//             </Typography>
//             <Typography variant="body2" color="text.secondary" textAlign="right">
//               משלוח חינם עד הבית להזמנות מעל 300 ש"ח, אחרת בעלות של 50 ש"ח.
//             </Typography>
//             <Typography variant="body2" color="primary" textAlign="right">
//               אפשרויות המשלוח יעודכנו במהלך התשלום בקופה.
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="h6" color="#B76E79" fontWeight="bold" textAlign="right">
//               סה"כ: ₪{totalPrice + (currentCart.length > 0 ? 50 : 0)}
//             </Typography>
//             <Button
//               variant="contained"
//               color="error"
//               fullWidth
//               sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}
//               onClick={() => setOpenCheckout(true)}
//             >
//               מעבר לתשלום
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* חלונית סיום הזמנה */}
//       <CheckOut open={openCheckout} handleClose={() => setOpenCheckout(false)} />
//     </Box>
//   );
// };

// export default ProductInCart;
