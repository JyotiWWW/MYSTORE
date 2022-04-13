import * as React from "react";
import useAuth from "../hooks/userAuth";
import { BASE_URL } from "../env";
import axios from "axios";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import GradeIcon from "@mui/icons-material/Grade";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TablePagination from "@mui/material/TablePagination";
import { blue } from "@mui/material/colors";
import { pink } from "@mui/material/colors";

const Products = () => {
  const auth = useAuth();
  const token = auth?.token ? auth?.token : null;

  const [allProducts, setProducts] = React.useState([]);
  const [allCategory, setCategory] = React.useState([]);
  const [allColors, setColors] = React.useState([]);
  const [userToken, setUserToken] = React.useState(token);
  const [selectedSort, setSorting] = React.useState({
    basedOn: "price",
    isAsc: false,
  });

  const handleCategoryChange = (category, event) => {
    const categories = allCategory.map((cat) => {
      return category.catname === cat.catname
        ? { isSelected: event.target.checked, catname: cat.catname }
        : { isSelected: cat.isSelected, catname: cat.catname };
    });
    setCategory(categories);
    // handleFilterProduct();

  };

  const handleColorChange = (color, event) => {
    const colors = allColors.map((oldcolor) => {
      return color.colorname === oldcolor.colorname
        ? { isSelected: event.target.checked, colorname: oldcolor.colorname }
        : { isSelected: oldcolor.isSelected, colorname: oldcolor.colorname };
    });
    setColors(colors);
  };

  const sortBy = (type) =>{
    if(selectedSort.basedOn !==type){
      const newState={...selectedSort};
      newState.basedOn=type;
      setSorting(newState);
    }
    else{
      const newState={...selectedSort};
      newState.isAsc=!selectedSort.isAsc;
      setSorting(newState);
    }
  }

  React.useLayoutEffect(() => {
    handleFilterProduct();
  },[allCategory,allColors,selectedSort])

  React.useLayoutEffect(() => {
    handleFilterProduct();
  },[])

  React.useLayoutEffect(() => {
    handleFilterProduct();
  },[])

  const handleFilterProduct=()=>{
    const selectedCategories= allCategory.filter((element)=>  element.isSelected).map((record)=>record.catname);
    const selectedColors= allColors.filter((element)=>  element.isSelected).map((record)=>record.colorname);

    let filtervalue={
      "categories": selectedCategories,
      "colors": selectedColors,
      "sort": {
        "basedOn": selectedSort.basedOn,
        "order": selectedSort.isAsc ? 'desc' :'asc'
      }
    };

    console.log(filtervalue);
    // console.log('event.currentTarget', filtervalue)
    const url = 'https://nameless-savannah-21991.herokuapp.com'
    const headers = {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    };

    axios({
      url: `${url}/filterCommonProducts`,
      method: 'POST',
      data: filtervalue,
      headers: headers
    })
      .then((res) => {
        console.log('success', res);
        if (res['data']) {
          setProducts(res.data.filteredcommonProducts);
          
        }
        else{

        }
      })
      .catch((error) => { console.log('error', error) })

  }
  React.useEffect(() => {
    
    if (userToken) {
      const url = BASE_URL;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios({
        url: `${url}/commonProducts`,
        method: "GET",
        headers: headers,
      })
        .then((res) => {
          if (res.status == 200) {
            setProducts(res.data.commonProducts);
            const categories = res.data.allCategories.map((cat) => {
              return { isSelected: false, catname: cat };
            });
            setCategory(categories);
            const colors = res.data.allColors.map((color) => {
              return { isSelected: false, colorname: color };
            });
            setColors(colors);
          }
        })
        .catch((err) => console.log("error", err));
    }

    // console.log(JSON.parse(localStorage.getItem('userData')));
  }, [userToken]);

  const allProductsList = ()=>{
    if (userToken) {
      const url = BASE_URL;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios({
        url: `${url}/commonProducts`,
        method: "GET",
        headers: headers,
      })
        .then((res) => {
          if (res.status == 200) {
            setProducts(res.data.commonProducts);
            const categories = res.data.allCategories.map((cat) => {
              return { isSelected: false, catname: cat };
            });
            // setCategory(categories);
            // const colors = res.data.allColors.map((color) => {
            //   return { isSelected: false, colorname: color };
            // });
            // setColors(colors);
          }
        })
        .catch((err) => console.log("error", err));
    }

  }
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    // event: React.MouseEvent<HTMLButtonElement> | null,
    // newPage: number
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    event
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        >
          {/* {topRatedProducts.map((product, index) => ( */}
          <Grid item xs={1} sm={1} md={4} lg={4} xl={4}>
            <Accordion sx={{ marginBottom: "10px" }} onClick={allProductsList}>
              <Typography
                sx={{ padding: "15px", color: blue[true ? 500 : 10] }}
              >
                {" "}
                All products{" "}
              </Typography>
            </Accordion>
            <Accordion sx={{ marginBottom: "10px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> Categories</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {allCategory.map((category, index) => (
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={category?.isSelected}
                            onChange={(event) =>
                              handleCategoryChange(category, event)
                            }
                          />
                        }
                        label={category?.catname || ""}
                      />
                    </FormGroup>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: "10px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Colors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {allColors.map((color, index) => (
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={color?.isSelected}
                            onChange={(event) =>
                              handleColorChange(color, event)
                            }
                          />
                        }
                        label={color?.colorname || ""}
                      />
                    </FormGroup>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <Typography sx={{ padding: "15px" }}>
                Sort By: &nbsp;&nbsp;
                <div style={{ display: "initial" }}>
                  <GradeIcon
                   onClick={()=>sortBy('rating')}
                    sx={{
                      color: blue[selectedSort?.basedOn != "rating" ? 50 : 500],
                    }}
                  ></GradeIcon>
                  {selectedSort?.basedOn == "rating" ? (
                    <>
                      <ArrowDownwardIcon
                        sx={{
                          color: pink[!selectedSort?.isAsc ? 200 : 50],
                          fontSize: "20px",
                        }}
                      ></ArrowDownwardIcon>
                      <ArrowUpwardIcon
                        sx={{
                          color: pink[selectedSort?.isAsc ? 200 : 50],
                          fontSize: "20px",
                        }}
                      ></ArrowUpwardIcon>
                    </>
                  ) : (
                    <></>
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  <CurrencyRupeeIcon
                   onClick={()=>sortBy('price')}
                    sx={{
                      color: blue[selectedSort?.basedOn != "price" ? 50 : 500],
                    }}
                  ></CurrencyRupeeIcon>
                  {selectedSort?.basedOn == "price" ? (
                    <>
                      <ArrowDownwardIcon
                        sx={{
                          color: pink[!selectedSort?.isAsc ? 200 : 50],
                          fontSize: "20px",
                        }}
                      ></ArrowDownwardIcon>
                      <ArrowUpwardIcon
                        sx={{
                          color: pink[selectedSort?.isAsc ? 200 : 50],
                          fontSize: "20px",
                        }}
                      ></ArrowUpwardIcon>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Typography>
            </Accordion>
          </Grid>
          <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            >
              {allProducts.map((product, index) => (
                <Grid item xs={2} sm={4} md={4} lg={3} xl={3} key={index}>
                  <Card key={product?.id} sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={
                        BASE_URL + "/images/productImages/" + product?.image
                      }
                      alt="green iguana"
                      sx={{
                        maxWidth: "25%",
                        margin: "auto",
                        paddingTop: "10px",
                      }}
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
                        sx={{ margin: "0" }}
                      >
                        {product?.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "0" }}
                      >
                        <b> Rs {product?.price}</b>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "0" }}
                      >
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
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}></Grid>
              <TablePagination
                component="div"
                count={100}
                page={page}
                style={{marginTop:0,marginBottom:0}}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
          {/* ))} */}
        </Grid>
      </Box>
    </div>
  );
};

export default Products;
