import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const GenerateNew = (props) => {
  const [values, setValues] = useState({
    quantity: ''
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
          title="Generate cards for new users"
					sx = {{
						color: "secondary.dark"
					}}
        />
				<Divider />
        <CardContent>
					<TextField
						fullWidth
						label="Quantity"
						name="quantity"
						onChange={handleChange}
						type="number"
						value={values.quantity}
						variant="outlined"
					/>
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
