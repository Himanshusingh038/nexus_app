import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

export const SettingsPassword = (props) => {
  // const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "admin@nexuscards.in",
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      current_password: Yup
        .string()
        .max(255)
        .required("This field is required"),
      new_password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255)
        .required("This field is required"),
      confirm_password: Yup
        .string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        .required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { email, current_password, new_password, confirm_password } = values;
        const data = {
          email: name,
          current_password: current_password,
          new_password: new_password,
          confirm_password: confirm_password,
        }
        await axios.post(
          url,
          data,
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        ).then(function (response) {
          if (response.statusCode === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Yeah...',
              text: 'Password updated successfully.',
              confirmButtonText: 'Great',
            }).then(() => {
              router.push('/');
            })
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={6}
              xs={12}
            >
              <TextField
                fullWidth
                margin="normal"
                label="Email Id"
                name="email"
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Current Password"
                name="current_password"
                onChange={formik.handleChange}
                type="password"
                value={formik.values.current_password}
                variant="outlined"
                error={Boolean(formik.touched.current_password && formik.errors.current_password)}
                helperText={formik.touched.current_password && formik.errors.current_password}
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="New Password"
                name="new_password"
                onChange={formik.handleChange}
                type="password"
                value={formik.values.new_password}
                variant="outlined"
                error={Boolean(formik.touched.new_password && formik.errors.new_password)}
                helperText={formik.touched.new_password && formik.errors.new_password}
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirm_password"
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirm_password}
                variant="outlined"
                error={Boolean(formik.touched.confirm_password && formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            py: 2,
            px: 3
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 2 }}
            type="submit"
            disabled={formik.isSubmitting}
          >
            Update Password
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={formik.handleReset}
          >
            Reset
          </Button>
        </Box>
      </Card>
    </form>
  );
};
