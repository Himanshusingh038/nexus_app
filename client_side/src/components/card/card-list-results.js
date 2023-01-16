import { useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
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
  TextField,
  Button,
} from "@mui/material";
import {
  RemoveRedEyeOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";

export const CardListResults = ({ cards, status, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleCopyText = (event) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(event.target.value);
    } else {
      document.execCommand("copy", true, event.target.value);
    }
    alert(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async(card_id) =>{
    const res = await axios.get(`http://localhost:8000/unassigned_action?action=delete&card_id=${card_id}`);
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
              {cards.slice(0, limit).map((card) => (
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
                          {card.status}
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
                          {card.reg_date}
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
                          Custom URL:
                        </Typography>
                        <Typography color="textPrimary" variant="body2">
                          {card.custom_url}
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
                        {card.c_phone}
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
                            Username:
                          </Typography>
                          <Typography color="textPrimary" variant="body2">
                            {card.c_name}
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
                            Views:
                          </Typography>
                          <Typography
                            color="primary.dark"
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {card.c_name}
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
                  <TableCell>
                    <Box className={`badge badge--${status}`}>
                      {card.status}
                    </Box>
                    {status === "unassigned" && (
                      <Box
                        sx={{
                          mt: 3,
                        }}
                      >
                        <TextField
                          fullWidth
                          type="text"
                          value=""
                          placeholder="Enter remarks (if any)"
                          variant="outlined"
                          onChange=""
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{format(card.reg_date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    {format(card.reg_date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
										<Box
											sx= {{
												display: 'flex',	
												alignItems: 'center'
											}}
										>
											{
												status === 'active' &&
												<a href={`http://nexuscards.in/profile/?id=${card.id}`} target="_blank">
													<Button
														color="primary"
														sx= {{
															minWidth: 'unset',
															p: 1
														}}
													>
														<RemoveRedEyeOutlined 
															sx= {{
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
														sx= {{
															minWidth: 'unset',
															p: 1
														}}
													>
														<RemoveRedEyeOutlined 
															sx= {{
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
														variant= "overline"
														color="success.main"
														sx= {{
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
												sx= {{
													minWidth: 'unset',
													p: 1
												}}
											>
												<DeleteOutlineOutlined 
                          onClick = {()=> handleDelete(card.id)}
													sx= {{
														fontSize: '20px'
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
        count={cards.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CardListResults.propTypes = {
  cards: PropTypes.array.isRequired,
};
