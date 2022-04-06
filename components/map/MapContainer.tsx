import { ChangeEvent, useState, VFC } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CarsPositions } from 'components/CarsPositions';
import { environment } from 'environment';
import { useFakeGPS } from 'hooks/useFakeGPS';
import { usePositions } from 'hooks/usePositions';

import { Map } from './Map';

const ContentWrapper = styled(Grid)({
  height: 600,
});

export const MapContainer: VFC = () => {
  useFakeGPS();
  const { positions, called, updateSearchingPhrase } = usePositions();

  const [searchBy, setSearchBy] = useState<string>('');

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchingPhrase(searchBy);
  };

  const { googleMapsApiKey } = environment;

  if (!googleMapsApiKey) {
    return <Typography variant="h3">Missing google maps api key</Typography>;
  }

  const render = (status: Status) => {
    if (status === Status.LOADING) {
      return <CircularProgress />;
    }
    if (status === Status.FAILURE) {
      return (
        <Typography variant="h4" color="error">
          Loading map failure
        </Typography>
      );
    }
    return <></>;
  };

  return (
    <Container sx={{ p: 4 }}>
      <Box
        component="form"
        py={3}
        onSubmit={handleFormSubmit}
        autoComplete="off"
        noValidate>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              name="regNumber"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              label="Search by"
            />
          </Grid>
          <Grid item>
            <Button type="submit" size="large" variant="outlined">
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ContentWrapper container>
        <Grid item md={3}>
          <CarsPositions positions={positions} loading={!called} />
        </Grid>
        <Grid item md={9}>
          <Wrapper apiKey={environment.googleMapsApiKey} render={render}>
            <Map positions={positions} />
          </Wrapper>
        </Grid>
      </ContentWrapper>
    </Container>
  );
};
