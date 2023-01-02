import Head from "next/head";
import { Grid, Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { GenerateNew } from "../components/generate-card/generate-card-new";
import { GenerateExisting } from "../components/generate-card/generate-card-existing";
import axios from "axios";

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
            Generate Card
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={6} xs={12}>
              <GenerateNew />
            </Grid>
            <Grid item lg={6} xs={12}>
              <GenerateExisting />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

