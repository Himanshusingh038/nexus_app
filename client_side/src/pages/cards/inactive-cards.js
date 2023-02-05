import Head from 'next/head';
import { useState } from "react";
import { Box, Container } from '@mui/material';
import { CardListResults } from '../../components/card/card-list-results';
import { CardListToolbar } from '../../components/card/card-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import axios from 'axios'

const Page = ({ cards }) => {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.c_name && card.c_name.toLowerCase().includes(search.toLowerCase()) ||
    card.c_phone && card.c_phone.toLowerCase().includes(search.toLowerCase()) ||
    card.c_email && card.c_email.toLowerCase().includes(search.toLowerCase()) ||
    card.custom_url && card.custom_url.toLowerCase().includes(search.toLowerCase()) ||
    card.card_no && card.card_no.toLowerCase().includes(search.toLowerCase()) ||
    card.id && card.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Inactive Cards | Nexus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CardListToolbar
            cards={cards}
            title="Inactive Cards"
            filename="nexus_inactive_cards"
            search={search}
            handleSearch={handleSearch}
          />
          <Box sx={{ mt: 3 }}>
            <CardListResults cards={filteredCards} status="inactive" />
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
  const url = `http://localhost:8000/inactive`
  const cookie = context.req.cookies
  const val = (cookie.loggedIn).toString()
  const res = await axios.get(url, { headers: { Cookie: `loggedIn=${val};` } });
  const data = await res.data;
  var cards = Object.values(data);
  return {
    props: {
      cards
    }
  };
}