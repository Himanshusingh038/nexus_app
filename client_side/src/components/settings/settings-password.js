import { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import axios from 'axios';

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value
    const current_password = event.target.current_password.value
    const new_password = event.target.new_password.value
    const confirm_password = event.target.confirm_password.value
    const data = {
      email: email,
      current_password: current_password,
      new_password: new_password,
      confirm_password: confirm_password
    }
    const url = 'http://localhost:8000/update_password'
    const res = await axios.post(url, data)

    if (res.statusCode === 200) {
      router.push('/update_password')

    } window.location.reload()
  }

  return (
    <form {...props} onSubmit={handleSubmit}>
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
              lg={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Id"
                name="email"
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Current Password"
                name="current_password"
                onChange={handleChange}
                type="password"
                value={values.current_password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="New Password"
                name="new_password"
                onChange={handleChange}
                type="password"
                value={values.new_password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                name="confirm_password"
                onChange={handleChange}
                type="password"
                value={values.confirm_password}
                variant="outlined"
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

          >
            Update Password
          </Button>
          <Button
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Card>
    </form>
  );
};
