import { useState } from "react";
import { useRouter } from "next/router"
import NextLink from "next/link";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { CardRemarks } from "./card-remarks"
import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, TextField, Button } from "@mui/material";
import { RemoveRedEyeOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Swal from 'sweetalert2';
import axios from "axios";

export const CardListResults = ({ cards, status, ...rest }) => {
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleCopyText = (event) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(event.target.value);
    } else {
      document.execCommand("copy", true, event.target.value);
    }
    Swal.fire({
      icon: 'success',
      title: 'Link Copied',
      text: event.target.value,
      confirmButtonText: 'Great',
    })
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (card_id) => {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: "Deleted card cannot be recovered",
      showCancelButton: true,
      cancelButtonText: 'No, keep it',
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCard(card_id);
      }
    });
  };

  const deleteCard = async (card_id) => {
    try {
      await axios.get(
        `http://localhost:8000/unassigned_action?action=delete&card_id=${card_id}`, { withCredentials: true }
      ).then(function (response) {
        if (response.statusText == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Card deleted successfully',
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
    } catch (error) {
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
                {status !== "unassigned" && (
                  <TableCell>Customer Info</TableCell>
                )}
                <TableCell>Card Info</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reg Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.length > 0 ? cards.slice(page * limit, page * limit + limit).map((card) => (
                <TableRow hover key={card.id}>
                  {status !== "unassigned" && (
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
                          {card.c_name == '' ? `Customer` : card.c_name}
                        </Typography>
                      </Box>
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
                          Phone:
                        </Typography>
                        <Typography color="textPrimary" variant="body2">
                          {card.c_phone == null ? `-` : card.c_phone}
                        </Typography>
                      </Box>
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
                          Email:
                        </Typography>
                        <Typography color="textPrimary" variant="body2">
                          {card.c_email}
                        </Typography>
                      </Box>
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
                          Custom URL:
                        </Typography>
                        <Typography color="textPrimary" variant="body2">
                          {card.c_custom_url == null ? `-` : card.c_custom_url}
                        </Typography>
                      </Box>
                    </TableCell>
                  )}
                  <TableCell>
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
                        Card No:
                      </Typography>
                      <Typography color="textPrimary" variant="body2">
                        {card.card_no}
                      </Typography>
                    </Box>
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
                        Card ID:
                      </Typography>
                      <Typography color="textPrimary" variant="body2">
                        {card.id}
                      </Typography>
                    </Box>
                    {status !== "unassigned" && (
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
                            Views:
                          </Typography>
                          <Typography
                            color="primary.dark"
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {card.views}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    <Box
                      sx={{
                        mt: 1,
                      }}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        value={`http://www.nexuscards.in/profile/?id=${card.id}`}
                        variant="outlined"
                        onClick={handleCopyText}
                        inputProps={{ readOnly: true }}
                        sx={{
                          mb: 0.5,
                        }}
                      />
                      <Typography color="textSecondary" variant="caption">
                        Click on the link to Copy
                      </Typography>
                    </Box>
                  </TableCell>
                  {status === "unassigned" && (
                    <TableCell>
                      <CardRemarks cardId={card.id} cardRemark={card.remarks} />
                    </TableCell>
                  )}
                  <TableCell>
                    <Box className={`badge badge--${status}`}>
                      {card.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {format(new Date(card.reg_date), 'dd-MM-yyyy')}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {
                        status === 'active' &&
                        <a href={`http://nexuscards.in/profile/?id=${card.id}`} target="_blank">
                          <Button
                            color="primary"
                            sx={{
                              minWidth: 'unset',
                              p: 1
                            }}
                          >
                            <RemoveRedEyeOutlined
                              sx={{
                                fontSize: '20px'
                              }}
                            />
                          </Button>
                        </a>
                      }
                      {
                        status === 'inactive' &&
                        <a href="http://nexuscards.in" target="_blank">
                          <Button
                            color="primary"
                            sx={{
                              minWidth: 'unset',
                              p: 1
                            }}
                          >
                            <RemoveRedEyeOutlined
                              sx={{
                                fontSize: '20px'
                              }}
                            />
                          </Button>
                        </a>
                      }
                      {
                        status === 'unassigned' &&
                        <NextLink
                          href={{
                            pathname: '/activate-card',
                            query: {
                              id: card.id,
                              num: card.id,
                              reg: card.reg_date
                            }
                          }}
                          passHref
                        >
                          <Typography
                            variant="overline"
                            color="success.main"
                            sx={{
                              cursor: 'pointer',
                              mr: 1.5,
                              textDecoration: 'underline',
                              '&:hover': {
                                color: 'success.dark'
                              }
                            }}
                          >
                            ACTIVATE
                          </Typography>
                        </NextLink>
                      }
                      <Button
                        color="primary"
                        sx={{
                          minWidth: 'unset',
                          p: 1
                        }}
                      >
                        <DeleteOutlineOutlined
                          onClick={() => handleDelete(card.id)}
                          sx={{
                            fontSize: '20px'
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
        count={cards.length}
        rowsPerPage={limit}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPageOptions={[5, 10]}
        showFirstButton={true}
        showLastButton={true}
      />
    </Card>
  );
};

CardListResults.propTypes = {
  cards: PropTypes.array.isRequired,
};