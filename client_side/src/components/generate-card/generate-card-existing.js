import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Select, InputLabel, MenuItem, FormControl } from '@mui/material';

export const GenerateExisting = (props) => {
  const [value, setValue] = useState({
    customers: [
      {
        id: '1',
        name: 'Jahanvi Jasani'
      },
      {
        id: '2',
        name: 'Himanshu Singh'
      }
    ]
  });

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          title="Generate cards for existing users"
					sx = {{
						color: "primary.dark"
					}}
        />
				<Divider />
        <CardContent>
					<FormControl fullWidth>
						<InputLabel id="existing-customers">Customers</InputLabel>
						<Select
							labelId="existing-customers"
							label="Customers"
							onChange={handleChange}
						>
              {value.customers.map((customer) => (
                <MenuItem value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
						</Select>
					</FormControl>
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
            Generate
          </Button>
          <Button
            color="primary"
            variant="outlined"
          >
            Reset
          </Button>
        </Box>
      </Card>
    </form>
  );
};
