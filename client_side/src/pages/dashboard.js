import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { StatisticsCard } from '../components/dashboard/statistics-card';
import { DashboardLayout } from '../components/dashboard-layout';

const items = [
  {
    title: 'Total Customers'
  },
	{
    title: 'Home'
  },
	{
    title: 'Home'
  },
	{
    title: 'Home'
  }
];

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
					{items.map((item) => (
            <Grid
							item
							xl={3}
							lg={3}
							sm={6}
							xs={12}
						>
							<StatisticsCard sx={{ height: '100%' }} />
						</Grid>
          ))}
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