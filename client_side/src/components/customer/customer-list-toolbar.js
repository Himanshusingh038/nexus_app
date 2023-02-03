import { Box, Card, CardContent, TextField, InputAdornment, Typography } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import CsvDownloadButton from 'react-json-to-csv'

export const CustomerListToolbar = ({ customers, search, handleSearch }) => {

  return (
    <Box>
      <Box>
        <Typography variant="h4">Customers</Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ width: 500, maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search"
                  variant="outlined"
                  search={search}
                  onChange={handleSearch}
                />
              </Box>
              <CsvDownloadButton
                data={customers}
                filename="nexus_customers"
                className="export_btn"
              >
                Export CSV
              </CsvDownloadButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
