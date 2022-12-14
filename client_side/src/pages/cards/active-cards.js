import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CardListResults } from '../../components/card/card-list-results';
import { CardListToolbar } from '../../components/card/card-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { cards } from '../../__mocks__/cards';
import axios from 'axios';

const activeCards = cards.filter(card => card.status === 'active')

const Page = ({ cards }) => {
  return (
    <>
      <Head>
        <title>Active Cards | Nexus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CardListToolbar cards={cards} title="Active Cards" />
          <Box sx={{ mt: 3 }}>
            <CardListResults cards={cards} status="active" />
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

export const getStaticProps = async (context) => {
  const url = "http://localhost:8000/active";
  const res = await axios.get(url,{ headers: { "Content-Type": "application/json"},withCredentials:true });
  const data = await res.data;
  var cards = Object.values(data);
  return {
    props: {
      cards,
    },
  };
};
