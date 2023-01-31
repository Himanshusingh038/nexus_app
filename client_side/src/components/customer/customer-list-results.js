import { useState } from "react";
import { useRouter } from "next/router"
import PropTypes from "prop-types";
import NextLink from "next/link";
import { format } from "date-fns";
import { Box, Card, Table, TableBody,TableCell, TableHead, TablePagination, TableRow, Typography, Button } from "@mui/material";
import { LockOpenOutlined, ModeEditOutlineOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Swal from 'sweetalert2';
import axios from "axios";

export const CustomerListResults = ({ customers, ...rest }) => {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (customer_id) =>{
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: "Deleted card cannot be recovered",
      showCancelButton: true,
      cancelButtonText: 'No, keep it',
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if(result.isConfirmed) {
        deleteCustomer(customer_id);
      }
    });
  };

  const deleteCustomer = async(customer_id) => {
    try {
      await axios.get(
        `http://localhost:8000/customer_actions?action=delete&cst_id=${customer_id}`,{withCredentials:true}
      ).then(function (response) {
        if (response.statusText=='OK') {
          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Customer deleted successfully',
            confirmButtonText: 'Great',
          }).then(() => {
            router.reload();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonText: 'Try again'
          })
        }
      });
    } catch(error) {
			console.error(error);
		}
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Reg Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { customers.length > 0 ? customers.slice(0, limit).map((customer) => (
                <TableRow hover key={customer.id}>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        mb: 1,
                      }}
                    >
                      <Typography
                        color="primary.dark"
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        mb: 3,
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
                        ID:
                      </Typography>
                      <Typography color="textPrimary" variant="body2">
                        {customer.cust_id}
                      </Typography>
                    </Box>
                    <a href={`http://nexuscards.in`} target="_blank">
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={
                          <LockOpenOutlined
                            sx={{
                              width: "16px",
                            }}
                          />
                        }
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        Access Panel
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography color="textPrimary" variant="body2">
                        {customer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography color="textPrimary" variant="body2">
                        {customer.phone==null? `-` : customer.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {format(new Date(customer.reg_date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <NextLink
                        href={{
                          pathname: "/edit-customer",
                          query: {
                            id: customer.cust_id,
                            name: customer.name,
                            email: customer.email,
                            mobile: customer.phone
                          },
                        }}
                        passHref
                      >
                        <Button
                          color="primary"
                          sx={{
                            minWidth: "unset",
                            p: 1,
                          }}
                        >
                          <ModeEditOutlineOutlined
                            sx={{
                              fontSize: "20px",
                            }}
                          />
                        </Button>
                      </NextLink>
                      <Button
                        color="primary"
                        sx={{
                          minWidth: "unset",
                          p: 1,
                        }}
                      >
                        <DeleteOutlineOutlined
                          onClick={() => handleDelete(customer.id)}
                          sx={{
                            fontSize: "20px",
                          }}
                        />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={12}>
                    No results found
                  </TableCell>
                </TableRow>
              )
            }
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
