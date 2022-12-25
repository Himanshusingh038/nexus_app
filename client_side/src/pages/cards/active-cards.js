import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CardListResults } from '../../components/card/card-list-results';
import { CardListToolbar } from '../../components/card/card-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { cards } from '../../__mocks__/cards';

const activeCards = cards.filter(card => card.status === 'active')

const Page = () => (
  <>
    <Head>
      <title>
        Active Cards | Nexus
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
        <CardListToolbar cards={activeCards} title='Active Cards' />
        <Box sx={{ mt: 3 }}>
          <CardListResults cards={activeCards} status='active' />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
