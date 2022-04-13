import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import useAuth from "../hooks/userAuth";
import { BASE_URL } from "../env";
import Grid from "@mui/material/Grid";
import {  useNavigate } from "react-router-dom";
const Home = () => {
  // const { auth } = useContext(AuthContext);
  const auth = useAuth();
  const token = auth?.token ? auth?.token : null;
  const [userToken, setUserToken] = useState(token);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  // console.log("autuserTokenh", auth);
  const navigate=useNavigate();
  useEffect(() => {
    const url = BASE_URL;

    if (userToken) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios({
        url: `${url}/getDashboard`,
        method: "GET",
        headers: headers,
      })
        .then((res) => {
           if (res.status === 200) {
            setCategoryProducts(res.data.productOfEachCategory);
            setTopRatedProducts(res.data.topRatedProducts);
          }
        })
        .catch((err) => console.log("error", err));
    }

    // console.log(JSON.parse(localStorage.getItem('userData')));
  }, [userToken]);

  return (
    <div className="container">
      <Carousel
        showThumbs={false}
        autoFocus="true"
        autoPlay="true"
        infiniteLoop="true"
        showIndicators={true}
      >
        {categoryProducts.map((product) => (
          <div key={product?.id}>
            <img
              height="250"
              width="20%"
              src={BASE_URL + "/images/productImages/" + product?.image}
            />
          </div>
        ))}
      </Carousel>

      <div className="mt-2">
        <h3>
          Popular Products
          <Button size="small" variant="contained" sx={{ float: "right" }} onClick={()=>navigate('/products')}>
            View All
          </Button>
        </h3>
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}
      >
        {topRatedProducts.map((product, index) => (
          <Grid item xs={2} sm={4} md={3} lg={3} xl={3} key={index}>
            <Card key={product?.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="120"
                image={BASE_URL + "/images/productImages/" + product?.image}
                alt="green iguana"
                sx={{ maxWidth: '25%', margin:"auto", paddingTop:"10px" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  color="primary"
                  component="div"
                  sx={{margin:"0"}}
                >
                  {product?.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div"  sx={{margin:"0"}}>
                  <b> Rs {product?.price}</b>
                </Typography>
                <Typography gutterBottom variant="h6" component="div"  sx={{margin:"0"}}>
                  * {product?.rating}
                </Typography>
                <Button size="small" variant="contained">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* ))} */}
    </div>
  );
};

export default Home;
