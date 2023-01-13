import Head from "next/head";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Container, Typography, Button, Card, CardHeader, CardContent, TextField, Divider } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";


const Page = () => {

	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      email: "",
      mobile: "",
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
                      value={formik.values.designation}
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