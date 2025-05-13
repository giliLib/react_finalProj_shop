import { useForm } from "react-hook-form";
import { addUser_signUp } from "../api/userServise";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import { TextField, Button, Typography, Container, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import "./AddUserSignUpForm.scss";

const AddUserSignUpForm = () => {
  let navigate = useNavigate();
  let { register, formState: { errors }, handleSubmit } = useForm();
  let disp = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const saveFunc = (data) => {
    addUser_signUp(data).then(res => {
      console.log(res.data);
      alert("added new user successfully");
      disp(userIn(res.data));
      navigate("/ProductList");
    }).catch(err => {
      console.log(err);
      alert("cannot add new user");
    });
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>הרשמה</h1>
        <h3>שמחים שבאת! רק כמה פרטים שנכיר אותך</h3>
        <Box component="form" noValidate onSubmit={handleSubmit(saveFunc)} sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="שם משתמש"
            dir="rtl"
            {...register("userName", { required: { value: true, message: "שם משתמש שדה חובה" } })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            InputProps={{}} // הוספת InputProps ריק
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="מייל"
            dir="rtl"
            {...register("email", {
              required: { value: true, message: "מייל שדה חובה" },
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "מייל בפורמט לא תקין" }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{}} // הוספת InputProps ריק
          />
      <TextField
  margin="normal"
  // required
  fullWidth
  label=" * סיסמה"
  type={showPassword ? 'text' : 'password'}
  dir=""
  {...register("password", {
    required: { value: true, message: "סיסמה שדה חובה" },
    minLength: { value: 5, message: "סיסמה לפחות חמישה תווים" }
  })}
  error={!!errors.password}
  helperText={errors.password?.message}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>


          <Button type="submit">
            הרשמה
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddUserSignUpForm;