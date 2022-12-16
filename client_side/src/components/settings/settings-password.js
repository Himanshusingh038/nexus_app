import { useState } from 'react';
import { Grid, Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

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

  return (
    <form {...props}>
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
