import Head from "next/head";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Container, Typography, Button, Card, CardHeader, CardContent, TextField, Divider } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Swal from 'sweetalert2'
import axios from "axios";

const Page = ({data}) => {
  const cust_data= data;
  const router = useRouter();
  const { query } = router
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string(),
      lname: Yup.string(),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255)
        .required("Password is required"),
    }),
    onSubmit: async(values, {setSubmitting, setErrors, resetForm}) => {
		try{
			const {fname, lname, email, password} = values;
			console.log(values);
			const card_id = query.id
			const old_email = cust_data.email;
			const cst_exists = cust_data.cst_exists;
			const cst_unq_id = cust_data.cst_unq_id;
			const cst_email = email;
			let data = JSON.stringify({
				fname,
        lname,
        cst_email,
				password,
				card_id,
				old_email,
        cst_exists,
				cst_unq_id,
			})
			const url = 'http://localhost:8000/activate_card'
			const response = await axios.post(
				url,
        data,
        { headers: { "Content-Type": "application/json"},withCredentials:true}
			);
			if (response.statusText=='OK') {
				Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Card activated successfully',
          confirmButtonText: 'Great',
        }).then(() => {
          router.push('/cards/active-cards');
        })
			  } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonText: 'Try again'
          }).then(() => {
            resetForm({ values: ''});
          })
			  }

		} catch(error) {
			console.error(error);
		} finally {
			setSubmitting(false);
			setErrors({});
		}
		  Router.push("/cards/active-cards").catch(console.error);
    },
  });
  

  return (
    <>
      <Head>
        <title>Activate Card | Nexus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ mb: 3 }} variant="h4">
            Activate Card
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={7} xs={12}>
              <form onSubmit={formik.handleSubmit}>
                <Card>
                  <CardHeader
                    title="Enter details to activate the card"
                    sx={{
                      color: "primary.dark",
                    }}
                  />
                  <Divider />
                  <CardContent>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="First Name"
                      name="fname"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.fname}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Last Name"
                      name="lname"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.lname}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email"
                      name="email"
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                      variant="outlined"
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Password"
                      name="password"
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.password}
                      variant="outlined"
                      error={Boolean(formik.touched.password && formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      py: 2,
                      px: 3,
                    }}
                  >
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      sx={{ mr: 2 }}
                      disabled={formik.isSubmitting}
                    >
                      Activate
                    </Button>
                    <Button 
                      color="primary" 
                      variant="outlined"
                      onClick={formik.handleReset}
                    >
                      Reset
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
            <Grid item lg={5} xs={12}>
              <Card>
                <CardHeader
                  title="Card details"
                  sx={{
                    color: "primary.dark",
                  }}
                />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 1,
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        mr: 1,
                      }}
                    >
                      Card No:
                    </Typography>
                    <Typography color="textPrimary" variant="body2">
                      {query.num}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 1,
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        mr: 1,
                      }}
                    >
                      Card Id:
                    </Typography>
                    <Typography color="textPrimary" variant="body2">
                      {query.id}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mb: 1,
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        mr: 1,
                      }}
                    >
                      Reg Date:
                    </Typography>
                    <Typography color="textPrimary" variant="body2">
                      {format((Date.now()), "dd/MM/yyyy")}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getServerSideProps = async(context) =>{
	const { query } = context;
	const {id} = query;
	const url = `http://localhost:8000/check_customer_exists?card_id=${id}&action=activate`
  const cookie = context.req.cookies
  const val = (cookie.loggedIn).toString()
  const res = await axios.get(url,{ headers: { Cookie: `loggedIn=${val};` }});
	const data = await res.data;
	// console.log(data);
	return {
        props: {
            data
        },
	}
}