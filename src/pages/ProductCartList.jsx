import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Card, CardContent, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, Link } from "react-router-dom";
import { addToCart, reduceQtyFromProduct, removeFromCart } from '../features/cartSlice';
import CheckOut from '../pages/CheckOut';
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const ProductCartList = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentCart = useSelector((state) => state.cart.arr);
  const totalPrice = useSelector((state) => state.cart.totalPriceProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("init");
  const { handleSubmit, reset, register, formState: { errors } } = useForm();

  useEffect(() => {
    reset({ userName: currentUser ? currentUser.userName : "" });
  }, [currentUser]);

  const save = (data) => {
    console.log("Current User:", currentUser);
    if (!currentUser) {
      navigate("/CheckOut");
    }
  }

  // הוספת סל הקניות להזמנה
  //   data.clientCode = currentUser?.id;
  //   data.cart = currentCart;  // כאן אנחנו מוסיפים את סל הקניות (מה- Redux)

  //   console.log("Order Data:", data);

  //   addOrder(data)
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("ההזמנה נוספה בהצלחה");
  //       navigate("/ProductList");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("לא ניתן להוסיף את ההזמנה");
  //     });
  // };
  return (
    <Box textAlign="center" p={3}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 300,
          fontFamily: "'Roboto', sans-serif",
          color: "#555",
          fontSize: "1.5rem",
          letterSpacing: "0.5px",
          lineHeight: 1.4,
        }}
      >
        {currentCart.length === 0 ? "סל הקניות שלך ריק" : "רשימת סל קניות"}
      </Typography>

      {status === "pending" ? (
        <CircularProgress />
      ) : currentCart.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Link to="/ProductList">
            <img
              src={`http://localhost:5500/api/images/cart.png`}
              alt="סל הקניות ריק"
              style={{
                height: "100%",
                objectFit: "contain",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16
              }}
            />
          </Link>
          <Link to="/ProductList">
            <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
              להתחלת קניה
            </Button>
          </Link>
        </Box>
      ) : (
        <Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2, mt: 2 }}>
            <Table sx={{ direction: "rtl" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">מוצר</TableCell>
                  <TableCell align="center">מחיר</TableCell>
                  <TableCell align="center">כמות</TableCell>
                  <TableCell align="center">סכום ביניים</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">
                      <Box display="flex" flexDirection="row" alignItems="center">
                        <img src={`http://localhost:5500/api/images/${item.img}`} alt={item.name} width={80} height={80} />
                        <Box ml={1} textAlign="center">
                          <Typography variant="body1" fontWeight="bold">
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">₪{item.price.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        onChange={(e) => {
                          if (e.target.value > item.qty) dispatch(addToCart(item));
                          else dispatch(reduceQtyFromProduct(item));
                        }}
                        defaultValue={item.qty}
                        inputProps={{
                          min: 1,
                          step: 1,
                        }}
                        sx={{ width: 60 }}
                      />
                    </TableCell>
                    <TableCell align="center">₪{(item.price * item.qty).toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => dispatch(removeFromCart(item))}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box flex={1}>
            <Card sx={{ bgcolor: "#E3F6FC", p: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="right">
                  סה"כ בסל הקניות
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" color="#B76E79" fontWeight="bold" textAlign="right">
                  סה"כ: ₪{totalPrice}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}
                  onClick={() => navigate("/CheckOut")}
                >
                  מעבר לתשלום
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductCartList;
