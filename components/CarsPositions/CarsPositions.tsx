import { useMemo, VFC } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Position } from '@prisma/client';
import { CarPosition } from 'types';

const Row = styled(Typography)({
  width: '100%',
});

const CarPositionsWrapper = styled(Grid)(({ theme }) => ({
  overflowY: 'scroll',
  height: 600,
  borderLeft: `1px solid ${theme.palette.common.white}`,
}));

const PositionCell = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.common.white}`,
  padding: theme.spacing(2),
}));

const LoadingWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

interface Props {
  positions: CarPosition[];
  loading: boolean;
}

export const CarsPositions: VFC<Props> = (props) => {
  const { positions, loading } = props;

  const printPositionValue = (
    carPositions: Position[],
    attribute: keyof Pick<Position, 'lat' | 'lng'>
  ): number | string => carPositions[0]?.[attribute] ?? '-';

  const printContent = useMemo(() => {
    if (loading) {
      return (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      );
    }
    return positions.map(({ regNumber, position }) => (
      <PositionCell item container key={regNumber} spacing={1}>
        <Grid item xs={12}>
          <Row variant="subtitle1" align="center">
            {regNumber}
          </Row>
        </Grid>
        <Grid item xs={12}>
          <Row variant="body2" align="center">
            Lat: {printPositionValue(position, 'lat')}
          </Row>
        </Grid>
        <Grid item xs={12}>
          <Row variant="body2" align="center">
            Lng: {printPositionValue(position, 'lng')}
          </Row>
        </Grid>
      </PositionCell>
    ));
  }, [positions, loading]);

  return <CarPositionsWrapper container>{printContent}</CarPositionsWrapper>;
};
