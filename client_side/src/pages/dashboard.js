import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { PeopleAltOutlined, CreditCardOutlined, CreditScoreOutlined, CreditCardOffOutlined, PersonAddAltOutlined, ContactPageOutlined } from "@mui/icons-material";
import { StatisticsCard } from "../components/dashboard/statistics-card";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";

const Dashboard = ({ data}) => {
  const total_cst = data.total_cst;
  const total_cards = data.total_cards;
  const active_cards = data.active_cards;
  const incomplete_cards  = data.incomplete_cards;
  const inactive_cards = data.inactive_cards;
  const unassigned_cards = data.unassigned_cards;
  return (
    <>
      <Head>
        <title>Admin Dashboard | Nexus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <StatisticsCard
                title="Total Customers"
                value= {total_cst}
                icon={PeopleAltOutlined}
                bg="#b19cd9"
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <StatisticsCard
                title="Total Cards"
                value={total_cards}
                icon={CreditCardOutlined}
                bg="#78a2cc"
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <StatisticsCard
                title="Active Cards"
                value= {active_cards}
                icon={CreditScoreOutlined}
                bg="#4e9c81"
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <StatisticsCard
                title="Incomplete Cards"
                value= {incomplete_cards}
                icon={ContactPageOutlined}
                bg="#ffb836"
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <StatisticsCard
                title="Unassigned Cards"
                value= {unassigned_cards}
                icon={PersonAddAltOutlined}
                bg="#e69690"
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <StatisticsCard
                title="Inactive Cards"
                value= {inactive_cards}
                icon={CreditCardOffOutlined}
                bg="#adaea5"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (dashboard) => (
  <DashboardLayout>{dashboard}</DashboardLayout>
);

export default Dashboard;

export const getStaticProps = async () => {
  const url = "http://localhost:8000/dashboard_stats";
  const res = await axios.get(url);
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
};
