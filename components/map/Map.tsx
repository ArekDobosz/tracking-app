import { useEffect, useRef, useState, VFC } from 'react';
import { GridAlgorithm, MarkerClusterer } from '@googlemaps/markerclusterer';
import { Box } from '@mui/material';
import { defaultLat, defaultLng, defaultMapZoom } from 'consts';
import { CarPosition } from 'types';

import { mapPositionsToMarkers } from './utils';

interface Props extends google.maps.MapOptions {
  positions: CarPosition[];
}

export const Map: VFC<Props> = (props) => {
  const { positions } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>();
  const [clusters, setClusters] = useState<MarkerClusterer>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: defaultLat, lng: defaultLng },
          zoom: defaultMapZoom,
        })
      );
    }
  }, [ref, map]);

  useEffect(() => {
    if (clusters) {
      clusters.clearMarkers();
    }
    setMarkers((prevMarkers) => mapPositionsToMarkers(positions, prevMarkers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, map]);

  useEffect(() => {
    if (map && markers) {
      const cluster = new MarkerClusterer({
        markers,
        map,
        algorithm: new GridAlgorithm({ maxDistance: 5000, gridSize: 100 }),
      });
      setClusters(cluster);
    }
  }, [map, markers]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '600px',
      }}
      ref={ref}
    />
  );
};
