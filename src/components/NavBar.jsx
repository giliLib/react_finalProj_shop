import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, IconButton, Badge, Box } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { userOut } from "../features/userSlice";

const NavBar = () => {
    let user = useSelector(state => state.user?.currentUser);
    const cartItemsCount = useSelector(state => state.cart.totalSum);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userOut(null));
        navigate('/login');
    };

    const renderUserNavBar = () => (
        <Box display="flex" alignItems="center">
            <Button color="inherit" component={Link} to="HomePage">דף הבית</Button>
            <Button color="inherit" component={Link} to="AddUserSignUpForm">הרשמה</Button>
            <Button color="inherit" component={Link} to="login">כניסה</Button>
            {/* <Button color="inherit" component={Link} to="CheckOut">להזמנה</Button> */}
            <Button color="inherit" component={Link} to="ProductList">רשימת מוצרים</Button>
            <IconButton color="inherit" component={Link} to="ProductCartList">
                <Badge badgeContent={cartItemsCount} color="error">
                    <ShoppingCart />
                </Badge>
            </IconButton>
            <Typography variant="body1" style={{ marginLeft: '16px' }}>
                {user ? `שלום ${user.userName}` : "שלום אורח"}
            </Typography>
        </Box>
    );

    const renderAdminNavBar = () => (
        <Box display="flex" alignItems="center">
            <Button color="inherit" component={Link} to="AddProductManager">הוספת מוצר</Button>
            <Button color="inherit" component={Link} to="ProductList">רשימת מוצרים</Button>
            <Typography variant="body1" style={{ marginLeft: '16px' }}>
                {"שלום מנהל"}
            </Typography>
        </Box>
    );

    return (
        <AppBar position="fixed" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
            <Toolbar>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <Link to={`./HomeScreen`}>
                        <img
                            src="https://dealcoupon.co.il/storage/medialibrary/520/shufersal-online-logo.png"
                            alt="Shufersal Logo"
                            style={{ height: 40, marginRight: '10px' }}
                        />
                    </Link>
                    {user && (
                        <Box display="flex" alignItems="center">
                            <IconButton color="inherit" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                                <ExitToAppIcon />
                            </IconButton>
                            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                התנתקות
                            </Typography>
                        </Box>
                    )}
                </Box>
                {user?.role === "ADMIN" ? renderAdminNavBar() : renderUserNavBar()}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;