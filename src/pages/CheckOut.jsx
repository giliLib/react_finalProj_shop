import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../api/orderService";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, CircularProgress, Card, CardContent } from "@mui/material";

const CheckOut = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentCart = useSelector((state) => state.cart.arr);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, reset, register, formState: { errors } } = useForm();

  useEffect(() => {
    reset({ userName: currentUser ? currentUser.userName : "" });
  }, [currentUser, reset]);

  const save = async (data) => {
    if (!currentUser) {
      navigate("/AddUserSignUpForm");
      return;
    }

    if (currentCart.length === 0) {
      alert("סל הקניות שלך ריק. הוסף מוצרים לפני ביצוע הזמנה.");
      return;
    }

    data.clientCode = currentUser.id;
    data.targetDate = data.targetDate;
    data.products = currentCart.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      qty: item.qty
    }));

    try {
      setLoading(true);
      const res = await addOrder(data, currentUser.token);
      alert("ההזמנה נוספה בהצלחה");
      navigate("/ProductList");
    } catch (err) {
      console.error(err);
      alert("לא ניתן להוסיף את ההזמנה: " + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            פרטי ההזמנה
          </Typography>
          <form onSubmit={handleSubmit(save)}>
            {/* שם משתמש (לא חובה בשרת) */}
            <TextField
              fullWidth
              label="שם משתמש"
              margin="normal"
              {...register("userName")}
            />

            {/* תאריך שליחה - חובה לפי נוד */}
            <TextField
              fullWidth
              label="תאריך שליחה"
              type="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register("targetDate", { required: "תאריך שליחה הוא שדה חובה" })}
              error={!!errors.targetDate}
              helperText={errors.targetDate?.message}
            />

            {/* כפתור שליחה */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "בצע הזמנה"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CheckOut;
