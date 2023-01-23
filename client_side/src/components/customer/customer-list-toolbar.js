import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import { SearchOutlined, FileDownloadOutlined } from "@mui/icons-material";
import axios from "axios";
import json2csv from "json2csv";

export const CustomerListToolbar = ({title}) => {
  console.log(title);
  const handleDownload = async () => {
    const res = await axios.get("http://localhost:8000/get_customers", {
      withCredentials: true,
    });
    const data = await res.data;
    const csv = json2csv.parse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `customers.csv`);
    document.body.appendChild(link);
    link.click();
  };
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
                />
              </Box>
              <Button
                onClick={handleDownload}
                startIcon={<FileDownloadOutlined />}
              >
                Export
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
