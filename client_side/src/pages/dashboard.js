import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { PeopleAltOutlined, CreditCardOutlined, CreditScoreOutlined, CreditCardOffOutlined, PersonAddAltOutlined, ContactPageOutlined } from '@mui/icons-material';
import { AllCards } from '../components/dashboard/all-cards';
import { StatisticsCard } from '../components/dashboard/statistics-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = () => (
  <>
    <Head>
      <title>
        Admin Dashboard | Nexus
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
					<Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard 
              title="Total Customers"
              value="170"
              icon={PeopleAltOutlined}
              bg='#b19cd9'
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard 
              title="Total Cards"
              value="156"
              icon={CreditCardOutlined}
              bg='#78a2cc'
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard 
              title="Active Cards"
              value="156"
              icon={CreditScoreOutlined}
              bg='#4e9c81'
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard 
              title="Incomplete Cards"
              value="73"
              icon={ContactPageOutlined}
              bg='#ffb836'
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard 
              title="Unassigned Cards"
              value="48"
              icon={PersonAddAltOutlined}
              bg='#e69690'
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard 
              title="Inactive Cards"
              value="2"
              icon={CreditCardOffOutlined}
              bg='#adaea5'
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <AllCards />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (dashboard) => (
  <DashboardLayout>
    {dashboard}
  </DashboardLayout>
);

export default Dashboard