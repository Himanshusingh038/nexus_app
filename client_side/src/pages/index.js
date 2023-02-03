import Head from 'next/head';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Logo } from '../components/logo';
import { Box, Button, Container, TextField } from '@mui/material';
import axios from 'axios';

axios.defaults.withCredentials = true
const Page = () => {
  const formik = useFormik({
    initialValues: {
      email: 'admin@nexuscards.in',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { email, password } = values;
        let datad = JSON.stringify({
          email: email,
          password: password
        });
        const response = await axios.post(
          "http://localhost:8000/login",
          datad,
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        const { data } = response;
        const sessionCookie = data;
        document.cookie = sessionCookie;
        if (response.data.status == 'success') {
          Router.push('/dashboard');
        } else {
          if (response.data.status == 'email not found') {
            setErrors({ email: "Incorrect email " });
          } else {
            setErrors({ password: "Incorrect password" });
          }
        }
      } catch (error) {
        setErrors({ password: 'An error occurred while logging in' });
        return { props: { error: error.message } };
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Admin Login | Nexus Cards</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          bgcolor: "background.paper"
        }}
      >
        <Container maxWidth="sm"
          sx={{
            pt: 6,
            pb: 8,
            borderRadius: '10px'
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box
              align="center"
              sx={{ mb: 8 }}>
              <Logo
                sx={{
                  width: 120
                }}
              />
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{ pt: 5 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;
