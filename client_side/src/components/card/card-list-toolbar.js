import { Box, Card, CardContent, TextField, InputAdornment, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import CsvDownloadButton from 'react-json-to-csv'

export const CardListToolbar = ({cards, title, filename}) => {

export const CardListToolbar = ({title,cards}) => {
  const handleDownload = async()=>{
    const datad =cards
    const csv = json2csv.parse(datad);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download',  `${title}.csv`);
    document.body.appendChild(link);
    link.click();
  }
  return(
    <Box>
      <Box>
        <Typography
          variant="h4"
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx= {{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Box sx={{ width: 500, maxWidth: '100%' }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search"
                  variant="outlined"
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