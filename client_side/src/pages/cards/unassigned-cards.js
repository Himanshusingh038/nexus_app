import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CardListResults } from '../../components/card/card-list-results';
import { CardListToolbar } from '../../components/card/card-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import axios from 'axios';

const Page = ({cards}) => {
  return (
    <>
      <Head>
        <title>Unassigned Cards | Nexus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CardListToolbar cards={cards} title="Unassigned Cards" />
          <Box sx={{ mt: 3 }}>
            <CardListResults cards={cards} status="unassigned" />
          </Box>
        </Container>
      </Box>
    </>
  );
};
  


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

export const getServerSideProps = async (context) => {
  const url = "http://localhost:8000/get_unassigned_card";
  const cookie = context.req.cookies
  const val = (cookie.loggedIn).toString()
  const res = await axios.get(url,{ headers: { Cookie: `loggedIn=${val};` }});
  const data = await res.data;
  var cards = Object.values(data);
  return {
    props: {
      cards,
    },
  };
};
