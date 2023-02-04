import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';

export const GenerateExisting = ({ customers = [] }) => {
  console.log('cust-->', customers);
  const [value, setValue] = useState([]);


  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/generate_existing'
    const data = { 'cst_unq_id': customers[0].id }
    const res = await axios.post(url, data, { withCredentials: true })
    console.log('res=>', res);
    alert('card generated successfully');
  }

  return (
    <form {...customers}>
      <Card>
        <CardHeader
          title="Generate cards for existing users"
          sx={{
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
              {customers.map((customer) => (
                <MenuItem value={customer.id} key={customer.id}>
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


