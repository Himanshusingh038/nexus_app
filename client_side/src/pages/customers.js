import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import axios from 'axios';
import { useState } from 'react';

const Page = ({ customers }) => {
  const [search, setSearch] = useState('')
  const handleChange = async (e) => {
    setSearch(e.target.value);
  }
  const filercustomers = customers.filter(customer =>
    customer.name && customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email && customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone && customer.phone.toLowerCase().includes(search.toLowerCase()) ||
    customer.id && customer.id == search
  )
  return (
    <>
      <Head>
        <title>Customers | Nexus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar
            customers={customers}
            search={search}
            handleSearch={handleChange}
          />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={filercustomers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getServerSideProps = async (context) => {
  const url = `http://localhost:8000/get_customers`;
  const cookie = context.req.cookies;
  const val = cookie.loggedIn.toString();
  const res = await axios.get(url, { headers: { Cookie: `loggedIn=${val};` } });
  const data = await res.data;
  var customers = Object.values(data);
  return {
    props: {
      customers,
    },
  };
};
