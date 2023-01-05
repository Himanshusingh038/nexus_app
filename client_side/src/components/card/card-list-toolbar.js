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

export const CardListToolbar = ({title}) => (
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
            <Button
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
