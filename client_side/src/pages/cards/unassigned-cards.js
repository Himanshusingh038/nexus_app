import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CardListResults } from "../../components/card/card-list-results";
import { CardListToolbar } from "../../components/card/card-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import axios from "axios";

const Page = ({ cards }) => {
  const unassignedCards = cards.filter((card) => card.status === "unassigned");
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
          <CardListToolbar cards={unassignedCards} title="Unassigned Cards" />
          <Box sx={{ mt: 3 }}>
            <CardListResults cards={unassignedCards} status="unassigned" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getStaticProps = async () => {
  const url = "http://localhost:8000/all_cards";
  const res = await axios.get(url);
  const data = await res.data;
  var cards = Object.values(data);
  return {
    props: {
      cards,
    },
  };
};
