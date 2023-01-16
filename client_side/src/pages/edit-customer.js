import Head from "next/head";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Container, Typography, Button, Card, CardHeader, CardContent, TextField, Divider } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios"
import { useRouter } from 'next/router';


const Page = () => {
  const router = useRouter();
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const {id, name, email, mobile} = router.query;
  const formik = useFormik({
    initialValues: {
      name: name,
      designation: "",
      email: email,
      mobile: mobile,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      designation: Yup.string(),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255),
      mobile: Yup.string()
				.matches(phoneRegExp, 'Must be a valid phone number')
    }),
    onSubmit: async(values, {setSubmitting, setErrors}) => {
      try{
        const url = `http://localhost:8000/edit_customer`
        const data ={
          name: values.name,
          designation: values.designation,
          email: values.email,
          mobile: values.mobile,
          cst_id: id
        }
        const res = await axios.post(url, data, { headers: { "Content-Type": "application/json"},withCredentials:true})
        if (res.statusText=='OK') {
          alert('edited successfully');
          router.push('/customers');
        } else {
          setErrors({ incorrect_data: "please the the data" });
        }
      }catch(err){
        console.log(err);
        return { props: { error: err.message } };
      }finally{
        setSubmitting(false)
      }
    },
  });
  

  return (
    <>
      <Head>
        <title>Edit Customer | Nexus</title>
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
            Edit Customer
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form onSubmit={formik.handleSubmit}>
                <Card>
                  <CardHeader
                    title="Update customer details"
                    sx={{
                      color: "primary.dark",
                    }}
                  />
                  <Divider />
                  <CardContent>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Name"
                      name="name"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.name}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Designation"
                      name="designation"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik./* `values` is an object that contains all the values of the form. */
                      values.designation}
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
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Mobile"
                      name="mobile"
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.mobile}
                      variant="outlined"
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
                      Update
                    </Button>
                    <Button color="primary" variant="outlined">
                      Reset
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;