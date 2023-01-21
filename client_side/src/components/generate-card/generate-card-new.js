import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import axios from 'axios';

export const GenerateNew = (props) => {
  const [values, setValues] = useState(0);

  const handleChange = async (event) => {
    setValues(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {'card_count':values}
    const res = await axios.post('http://localhost:8000/generate_promotional',body,{ withCredentials: true });
    window.location.reload();
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
            onClick={handleSubmit}
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
