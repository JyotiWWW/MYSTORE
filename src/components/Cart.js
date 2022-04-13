import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/userAuth";
import { BASE_URL } from "../env";
// import {  useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { getCartProducts } from "../redux/reducers/cartReducer";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

const Cart = () => {
  const auth = useAuth();
  const token = auth?.token ? auth?.token : null;
  const [userToken, setUserToken] = useState(token);
  const [cartProduct, setCartProducts] = useState([]);
  const { productDetails } = useSelector((state) => state.cart);
//   const dispatch = useDispatch()

//   useEffect(() => {
//     if (userToken) {
//       console.log("userToken effect");
//       const headers = {
//         Authorization: `Bearer ${userToken}`,
//       };
//     //   dispatch(getCartProducts(headers));
//     }
//   }, []);

  useEffect(() => {
    console.log(" productDetails effect");
    setCartProducts(productDetails);
  }, [productDetails]);
  
  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        >
          {/* {topRatedProducts.map((product, index) => ( */}
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartProduct.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.productName}
                      </TableCell>
                      <TableCell align="center">{row.orderQuantity}</TableCell>
                      <TableCell align="center">{row.productPrice}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center" }}
                  component="div"
                >
                  Review Order
                </Typography>
                <TableContainer component={Paper} sx={{ mt: "19px" }}>
                  <Table sx={{ minWidth: "auto" }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="col">
                          Subtotal
                        </TableCell>
                        <TableCell component="th" scope="col">
                          245445
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          GST(5%)
                        </TableCell>
                        <TableCell component="th" scope="row">
                          2300
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Order total
                        </TableCell>
                        <TableCell component="th" scope="row">
                          1234
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button size="small" variant="contained">
                  {" "}
                  Proceed To Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Cart;
