import { useState } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { format } from "date-fns";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import {
  LockOpenOutlined,
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";

export const CustomerListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (cst_id) => {
    const res = await axios.get(
      `http://localhost:8000/customer_actions?action=delete&cst_id=${cst_id}`
    );
    window.location.reload();
    console.log(res);
  };

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
              {customers.slice(0, limit).map((customer) => (
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
                        {customer.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {format(customer.reg_date, "dd/MM/yyyy")}
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
              ))}
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
