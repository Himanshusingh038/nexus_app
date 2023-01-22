import { useFormik } from 'formik';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import axios from 'axios';

export const GenerateNew = (props) => {
  const formik = useFormik({
    initialValues: {
      quantity: ''
    },
    onSubmit: async(values, {setSubmitting, setErrors}) => {
      try {
        const {quantity} = values;
        const body = {'card_count':quantity}
        const response = await axios.post('http://localhost:8000/generate_promotional',body,{ withCredentials: true });
        
      } catch {

      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
						onChange={formik.handleChange}
						type="number"
						value={formik.values.quantity}
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
            type="submit"
            variant="contained"
            sx={{ mr: 2 }}
            disabled={formik.isSubmitting}
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
