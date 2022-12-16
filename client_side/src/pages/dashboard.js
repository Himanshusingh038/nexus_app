import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';
import { LatestOrders } from '../components/dashboard/latest-orders';
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
              icon={HomeOutlined}
              bg='#d14343'
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
              icon={HomeOutlined}
              bg='#14b8a6'
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <LatestOrders />
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