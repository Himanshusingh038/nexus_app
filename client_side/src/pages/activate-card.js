import Head from "next/head";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Container, Typography, Button, Card, CardHeader, CardContent, TextField, Divider } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => {

	const formik = useFormik({
		initialValues: {
			fname: '',
			lname: '',
      email: '',
      password: ''
    },
		validationSchema: Yup.object({
			fname: Yup 
				.string(),
			lname: Yup 
				.string(),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
		onSubmit: () => {
      Router
        .push('/cards/active-cards')
        .catch(console.error);
    }
	})

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
							<form>
								<Card>
									<CardHeader
										title="Enter details to activate the card"
										sx = {{
											color: "primary.dark"
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
										/>
									</CardContent>
									<Divider />
									<Box
										sx={{
											display: 'flex',
											py: 2,
											px: 3
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
									sx = {{
										color: "primary.dark"
									}}
								/>
								<Divider />
								<CardContent>
									<Box
										sx = {{
											display: 'flex',
											mb: 1
										}}  
									>
										<Typography
											color="textPrimary"
											variant="body2"
											sx= {{
												fontWeight: 'bold',
												mr: 1
											}}
										>
											Card No:
										</Typography>
										<Typography
											color="textPrimary"
											variant="body2"
										>
											166911034770831
										</Typography>
									</Box>
									<Box
										sx = {{
											display: 'flex',
											mb: 1
										}} 
									>
										<Typography
											color="textPrimary"
											variant="body2"
											sx= {{
												fontWeight: 'bold',
												mr: 1
											}}
										>
											Card Id:
										</Typography>
										<Typography
											color="textPrimary"
											variant="body2"
										>
											166911034770831
										</Typography>
									</Box>
									<Box
										sx = {{
											display: 'flex',
											mb: 1
										}} 
									>
										<Typography
											color="textPrimary"
											variant="body2"
											sx= {{
												fontWeight: 'bold',
												mr: 1
											}}
										>
											Reg Date:
										</Typography>
										<Typography
											color="textPrimary"
											variant="body2"
										>
											166911034770831
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

