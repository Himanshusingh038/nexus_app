import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import Swal from 'sweetalert2'
import axios from 'axios';

export const GenerateNew = (props) => {
  const formik = useFormik({
    initialValues: {
      quantity: ''
    },
    validationSchema: Yup.object({
      quantity: Yup
        .number()
        .positive('Quantity must be a positive number')
        .required('Quantity is required')
        .min(1, 'Quantity must be greater than or equal to 1')
        .max(20, 'Quantity must be lesser than or equal to 20')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { quantity } = values;
        const body = { 'card_count': quantity }
        const response = await axios.post('http://localhost:8000/generate_promotional', body, { withCredentials: true });
        if (response.statusText == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Card generation successful',
            confirmButtonText: 'Great',
          }).then((result) => {
            resetForm({ values: '' });
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonText: 'Try again'
          }).then(() => {
            resetForm({ values: '' });
          })
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            title="Generate cards for new users"
            sx={{
              color: "secondary.dark"
            }}
          />
          <Divider />
          <CardContent>
            <TextField
              error={Boolean(formik.touched.quantity && formik.errors.quantity)}
              fullWidth
              helperText={formik.touched.quantity && formik.errors.quantity}
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
              onClick={formik.handleReset}
            >
              Reset
            </Button>
          </Box>
        </Card>
      </form>
    </div>

  );
};
