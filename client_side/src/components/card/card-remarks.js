import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from "axios";

export const CardRemarks = ({ cardRemark, cardId }) => {

	const [remarks, setRemarks] = useState(cardRemark);

	const formik = useFormik({
		initialValues: {
			remarks: ""
		},
		validationSchema: Yup.object({
			remarks: Yup.string()
				.max(255)
				.min(3, 'Must be at least 3 characters long')
				.required("Remark is required")
				.matches(/^[\w\d\s_.-]+$/, "Invalid special characters"),
		}),
		onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
			try {
				const { remarks } = values;
				const data = {
					card_id: cardId,
					remarks: remarks,
				}
				const url = 'http://localhost:8000/update_remarks';
				await axios.post(
					url,
					data,
					{ withCredentials: true }
				).then(function (response) {
					if (response.statusText == 'OK') {
						Swal.fire({
							icon: 'success',
							title: 'Yeah...',
							text: 'Remark updated successfully',
							confirmButtonText: 'Great',
						}).then(() => {
							resetForm({ values: '' });
							setRemarks(remarks);
						})
					}
					else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Something went wrong!',
							confirmButtonText: 'Try again'
						}).then(() => {
							resetForm({ values: '' });
						})
					}
				});
			} catch (error) {
				console.error(error);
			} finally {
				setSubmitting(false);
				setErrors({});
			}
		}
	})

	return (
		<>
			<Box>
				<Box
					sx={{
						display: "flex",
					}}
				>
					<Typography
						color="textPrimary"
						variant="body2"
						sx={{
							fontWeight: "bold",
							mr: 1,
						}}
					>
						Remarks:
					</Typography>
					<Typography color="textPrimary" variant="body2">
						{remarks}
					</Typography>
				</Box>
				<Box
					sx={{
						mt: 1,
					}}
				>
					<form onSubmit={formik.handleSubmit}>
						<Box>
							<TextField
								fullWidth
								label="Remarks"
								name="remarks"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.remarks}
								variant="outlined"
								error={Boolean(formik.touched.remarks && formik.errors.remarks)}
								helperText={formik.touched.remarks && formik.errors.remarks}
							/>
							<Box
								sx={{
									display: 'flex',
									mt: 1.5
								}}
							>
								<Button
									size="small"
									color="primary"
									variant="contained"
									type="submit"
									disabled={formik.isSubmitting}
								>
									Submit
								</Button>
								<Button
									size="small"
									color="primary"
									variant="outlined"
									onClick={formik.handleReset}
									sx={{
										ml: 1
									}}
								>
									Reset
								</Button>
							</Box>
						</Box>
					</form>
				</Box>
			</Box>
		</>
	)
}