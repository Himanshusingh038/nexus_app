import Head from "next/head";
import { useFormik } from 'formik';
import { Grid, Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => {
  return (
    <>
      <Head>
        <title>Generate Card | Nexus</title>
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
            <Grid item lg={6} xs={12}>
              
            </Grid>
            <Grid item lg={6} xs={12}>
              
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

