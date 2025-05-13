import { useEffect, useState } from "react";
import { getAllProducts, getTotalPages } from "../api/productService.js";
import Product from '../components/product.jsx'
import ProductForManager from "../components/ProductForManager.jsx";
import { CircularProgress, Grid, Pagination } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import {SpeedDialAction,Box} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';//קפואים
import FlatwareOutlinedIcon from '@mui/icons-material/FlatwareOutlined';//חד פעמי
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import IcecreamOutlinedIcon from '@mui/icons-material/IcecreamOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';//ניקיון
import CoffeeOutlinedIcon from '@mui/icons-material/CoffeeOutlined';//חד פעמי
import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import ScaleIcon from '@mui/icons-material/Scale';
import { Typography } from "@mui/material";

const ProductList = () => {
    let [arrProducts, setArrProducts] = useState([]);
    let [numPage, setNumPage] = useState(0);
    let [currentPage, setCurrentPage] = useState(1)
    let [status, setStatus] = useState("init");
    let [open, setOpen] = useState(false);
    let [category, setCategory] = useState("ALL")
    // let categories = ['ALL', 'ירקות', 'פירות', 'מוצרי חלב',
    //      'משקאות', 'מוצרי ניקיון','שימורים','קפואים','לחמים','חטיפים','מתוקים','דגני בוקר','חד פעמי'];
    let currentUser = useSelector(st => st.user.currentUser);


    const actions = [
        { icon: <ScaleIcon />, name: 'ירקות' },
        { icon: <FilterVintageIcon />, name: 'פירות' },
        { icon: <AcUnitOutlinedIcon />, name: 'קפואים' },
        { icon: <RamenDiningOutlinedIcon />, name: 'שימורים' },
        { icon: <EmojiFoodBeverageOutlinedIcon />, name: 'מוצרי חלב' },
        { icon: <CleaningServicesOutlinedIcon />, name: 'מוצרי נקיון' },
        { icon: <LiquorOutlinedIcon />, name: 'משקאות' },
        { icon: <LocalPizzaOutlinedIcon />, name: 'חטיפים' },
        { icon: <IcecreamOutlinedIcon />, name: 'מתוקים' },
        { icon: <FlatwareOutlinedIcon />, name: 'חד פעמי' },
        { icon: <Inventory2OutlinedIcon />, name: 'דגני בוקר' },
        { icon: <BakeryDiningOutlinedIcon />, name: ' מאפים' },
        
      ];

    function onDelete(id) {
        let copy = arrProducts.filter(p => p._id !== id)
        setArrProducts(copy)
    }

    useEffect(() => {
        getAllProducts(category, currentPage)
            .then(res => {
                console.log(category)
                setArrProducts(res.data);
                console.log(res.data);
            }
            )
            .catch(err => {
                console.log(err);
                alert("תקלה בשליפת המוצרים");
            });
    }, [currentPage, category]);

    useEffect(() => {
        getTotalPages(category)
            .then(res => {
                setNumPage(res.data.pages);
                console.log(res.data.pages);
            }
            )
            .catch(err => {
                console.log(err);
                alert("תקלה בשליפת מספר עמודים");
            });
    }, [currentPage, category])



    return (
        <>
     <Box sx={{ mt: '80px', p: 4, textAlign: 'center' }}>
    <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
        רשימת מוצרים
    </Typography>
    <Typography variant="h6" color="text.secondary">
        כאן תוכלו למצוא את כל המוצרים שלנו ולהוסיף אותם לסל הקניות שלכם
    </Typography>
</Box>

   <Box sx={{ height: 120, transform: 'translateZ(0px)', flexGrow: 1 }}>
  <SpeedDial
    ariaLabel="SpeedDial basic example"
    icon={<WidgetsOutlinedIcon />}
    sx={{
      position: 'fixed',
      bottom: 16,
      left: 16, // למקם את ה-SpeedDial בצד ימין של המסך
    }}
    direction="right" // פעולה תיפתח מימין לשמאל
  >
    {actions.map((action) => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        onClick={() => {
          setCategory(action.name);
          setCurrentPage(1);
        }}
        tooltipTitle={action.name}
        sx={{
          '& .MuiSpeedDialAction-staticTooltipLabel': {
            direction: 'rtl', // עיצוב הטקסט בכיוון ימין לשמאל
            textAlign: 'right', // למקם את הטקסט בצד ימין
          },
        }}
      />
    ))}
  </SpeedDial>
</Box>

            {open && categories.map((item) => (
                <input type="button" key={item} value={item} onClick={() => {
                    setCategory(item);
                    setCurrentPage(1);
                }} />
            ))}

            {status === "pending" ? (
                <CircularProgress />
            ) : (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        {arrProducts.map(item => (
                            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                                {currentUser?.role === "ADMIN" ? (
                                    <ProductForManager product={item} onDelete={onDelete} />
                                ) : (
                                    <Product product={item} />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination count={numPage} color="primary" page={currentPage} onChange={(e, value) => setCurrentPage(value)} />
                </>
            )}
            <Outlet />
        </>
    );
};

export default ProductList;
