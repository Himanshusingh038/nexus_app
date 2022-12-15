import Head from 'next/head';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Logo } from '../components/logo';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: 'admin@nexuscards.in',
      password: 'password'
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
    onSubmit: () => {
      Router
        .push('/')
        .catch(console.error);
    }
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
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
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


export default Login;
