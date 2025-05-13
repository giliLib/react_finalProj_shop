import { useForm } from "react-hook-form";
import { login } from "../api/userServise";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import "./login.scss";

const Login = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    
    // ניהול מצב של ה-Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const saveFunc = async (data) => {
        try {
            const res = await login(data.userName, data.password);
            dispatch(userIn(res.data));
            setSnackbarMessage("נכנסת בהצלחה!");
            setOpenSnackbar(true);
            setTimeout(() => navigate("/ProductList"), 1500); // מעבר לעמוד הבא אחרי 1.5 שניות
        } catch (err) {
            console.error(err);
            setSnackbarMessage(err.response?.data?.message || "שגיאה בהתחברות");
            setOpenSnackbar(true);
        }
    };

    return (
        <div className="login-container">
            <h1>כניסה</h1>
            <h3>!שמחים שבאת</h3>
            <form onSubmit={handleSubmit(saveFunc)}>
                <TextField
                    label="שם משתמש"
                    variant="outlined"
                    {...register("userName", { required: "שם משתמש שדה חובה" })}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    fullWidth
                    sx={{ input: { textAlign: "center" }, mb: 2 }}
                />

                <TextField
                    label="סיסמה"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    {...register("password", {
                        required: "סיסמה שדה חובה",
                        minLength: { value: 5, message: "סיסמה לפחות חמישה תווים" },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    התחברות
                </Button>
            </form>

            {/* Snackbar להודעות */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // הסתרה אוטומטית אחרי 3 שניות
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </div>
    );
};

export default Login;
