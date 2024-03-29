import { Box, Card, CardContent, TextField, InputAdornment, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import CsvDownloadButton from 'react-json-to-csv'

export const CardListToolbar = ({ cards, title, filename, search, handleSearch }) => {

  return (
    <Box>
      <Box>
        <Typography variant="h4">{title}</Typography>
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
                  value={search}
                  onChange={handleSearch}
                />
              </Box>
              <CsvDownloadButton
                data={cards}
                filename={filename}
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
}