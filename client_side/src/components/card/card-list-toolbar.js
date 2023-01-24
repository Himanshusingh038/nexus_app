import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography
} from '@mui/material';
import { SearchOutlined, FileDownloadOutlined } from '@mui/icons-material';
import axios from 'axios';
import json2csv from 'json2csv';


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
            <Button onClick={handleDownload}
              startIcon={(<FileDownloadOutlined />)}
            >
              Export
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
}