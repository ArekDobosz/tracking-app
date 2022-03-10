import { useCallback, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import {
  AbstractAlgorithm,
  DBScanAlgorithm,
  GridAlgorithm,
  KmeansAlgorithm,
  MarkerClusterer,
  NoopAlgorithm,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  version: 'weekly',
  libraries: ['places'],
});

interface Marker {
  lat: number;
  lng: number;
}

export const useGoogleMaps = (elementId: string, initialMarkers?: Marker[]) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const init = useCallback(() => {
    loader
      .load()
      .then((google) => {
        const mapInstance = new google.maps.Map(
          document.getElementById(elementId) as HTMLElement,
          {
            center: { lat: 54.443867358378284, lng: 18.56338886216462 },
            zoom: 11,
            streetViewControl: false,
            mapTypeControl: false,
          }
        );

        setMap(mapInstance);

        if (initialMarkers) {
          const markers = initialMarkers.map(({ lat, lng }) => {
            return new google.maps.Marker({
              position: {
                lat,
                lng,
              },
              map: mapInstance,
            });
          });

          new MarkerClusterer({
            algorithm: new GridAlgorithm({ maxDistance: 40000 }),
            markers,
            map: mapInstance,
          });
        }
      })
      .catch((e) => {
        // do something
      });
  }, []);

  useEffect(() => {
    if (!map) {
      init();
    }
  }, [map]);
};
