import { VFC } from 'react';
import { Box } from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader';

import { useGoogleMaps } from './useGoogleMaps';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  version: 'weekly',
  libraries: ['places'],
});

const rand = () => Math.random() / 10;

export const Map: VFC = () => {
  const pins = [];
  for (let i = 0; i < 1000; i = i + 1) {
    const lat = 54.43047329917815;
    const lng = 18.53338886216462;
    pins.push({
      lat: lat - rand(),
      lng: lng - rand(),
    });
  }
  useGoogleMaps('map', pins);

  console.log('render');

  return <Box id="map" sx={{ width: '100%', height: 600 }} />;
};
