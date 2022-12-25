import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  TextField
} from '@mui/material';

export const CardListResults = ({ cards, status, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  // const filteredCards = cards.filter(card => card.status === status)
  
  const handleCopyText = (event) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(event.target.value);
    } else {
      document.execCommand("copy", true, event.target.value);
    }
    alert(event.target.value);
 } 

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Customer Info
                </TableCell>
                <TableCell>
                  Card Info
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Reg Date
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.slice(0, limit).map((card) => (
                <TableRow
                  hover
                  key={card.id}
                >
                  <TableCell>
                    <Box
                      sx = {{
                        display: 'flex',
                        mb: 1
                      }}  
                    >
                      <Typography
                        color="primary.dark"
                        variant="body1"
                        sx = {{
                          fontWeight: 'bold'
                        }}
                      >
                        {card.customer.name}
                      </Typography>
                    </Box>
                    <Box
                      sx = {{
                        display: 'flex'
                      }}  
                    >
                      <Typography
                          color="textPrimary"
                          variant="body2"
                          sx= {{
                            fontWeight: 'bold',
                            mr: 1
                          }}
                        >
                          Phone:
                        </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {card.customer.phone}
                      </Typography>
                    </Box>
                    <Box
                      sx = {{
                        display: 'flex'
                      }}  
                    >
                      <Typography
                          color="textPrimary"
                          variant="body2"
                          sx= {{
                            fontWeight: 'bold',
                            mr: 1
                          }}
                        >
                          Email:
                        </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {card.customer.email}
                      </Typography>
                    </Box>
                    <Box
                      sx = {{
                        display: 'flex'
                      }}  
                    >
                      <Typography
                          color="textPrimary"
                          variant="body2"
                          sx= {{
                            fontWeight: 'bold',
                            mr: 1
                          }}
                        >
                          Custom URL:
                        </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {card.custom_url}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  <Box
                      sx = {{
                        display: 'flex'
                      }}  
                    >
                      <Typography
                          color="textPrimary"
                          variant="body2"
                          sx= {{
                            fontWeight: 'bold',
                            mr: 1
                          }}
                        >
                          Views:
                        </Typography>
                      <Typography
                        color="primary.dark"
                        variant="body2"
                        sx= {{
                          fontWeight: 'bold'
                        }}
                      >
                        {card.views}
                      </Typography>
                    </Box>
                    <Box
                      sx = {{
                        display: 'flex'
                      }}  
                    >
                      <Typography
                          color="textPrimary"
                          variant="body2"
                          sx= {{
                            fontWeight: 'bold',
                            mr: 1
                          }}
                        >
                          Card No:
                        </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {card.card_no}
                      </Typography>
                    </Box>
                    <Box
                      sx = {{
                        display: 'flex'
                      }}  
                    >
                      <Typography
                          color="textPrimary"
                          variant="body2"
                          sx= {{
                            fontWeight: 'bold',
                            mr: 1
                          }}
                        >
                          Card Id:
                        </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {card.card_id}
                      </Typography>
                    </Box>
                    <Box
                      sx = {{
                        display: 'flex'
                      }}  
                    >
                      <Typography
                          color="textPrimary"
                          variant="body2"
                          sx= {{
                            fontWeight: 'bold',
                            mr: 1
                          }}
                        >
                          Username:
                        </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {card.custom_url}
                      </Typography>
                    </Box>
                    <Box
                      sx = {{
                        mt: 1
                      }}  
                    >
                      <TextField
                        fullWidth
                        type="text"
                        value={`http://www.nexuscards.in/profile/?id=${card.card_id}`}
                        variant="outlined"
                        onClick={handleCopyText} 
                        inputProps={{ readOnly: true, }}
                        sx= {{
                          mb: 0.5
                        }}
                      />
                      <Typography
                        color="textSecondary"
                        variant="caption"
                      >
                        Click on the link to Copy
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {card.status}
                  </TableCell>
                  <TableCell>
                    {format(card.reg_date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
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
  cards: PropTypes.array.isRequired
};
