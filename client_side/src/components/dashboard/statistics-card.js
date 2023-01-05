import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

export const StatisticsCard = ({title, value, icon, bg}) => {
  var ComponentName = icon;
  return (
    <>
      <Card
        sx = {{
          backgroundColor: bg
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
            <Typography
                color="primary.contrastText"
                variant="h4"
              >
                {value}
              </Typography>
              <Typography
                color="primary.contrastText"
                gutterBottom
                variant="overline"
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  border: 2,
                  borderColor: 'primary.contrastText',
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  height: 56,
                  width: 56
                }}
              >
                <ComponentName />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
