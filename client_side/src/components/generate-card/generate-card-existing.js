import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Select, InputLabel, MenuItem, FormControl } from '@mui/material';

export const GenerateExisting = (props) => {
  const [value, setValue] = useState({
    customers: ''
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
						color: "secondary.dark"
					}}
        />
				<Divider />
        <CardContent>
					<FormControl fullWidth>
						<InputLabel id="existing-customers">Age</InputLabel>
						<Select
							labelId="existing-customers"
							id="demo-simple-select"
							value={value.customers}
							label="Age"
							onChange={handleChange}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
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
