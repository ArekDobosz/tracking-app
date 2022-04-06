import { CarPosition } from 'types';

const findMarker = (
  markers: google.maps.Marker[],
  label: string
): google.maps.Marker | undefined =>
  markers.find((marker) => (marker.getLabel() as unknown as string) === label);

const updateMarkerPosition = (
  marker: google.maps.Marker,
  lat: number,
  lng: number
) => {
  marker.setPosition(new google.maps.LatLng(lat, lng));
};

const createNewMarker = (lat: number, lng: number, label: string) =>
  new google.maps.Marker({
    position: { lat, lng },
    label,
    optimized: true,
  });

export const mapPositionsToMarkers = (
  positions: CarPosition[],
  prevMarkers?: google.maps.Marker[]
): google.maps.Marker[] => {
  const markersPositions = positions.map(({ regNumber, position }) => ({
    label: regNumber,
    lat: position[0]?.lat,
    lng: position[0]?.lng,
  }));

  if (prevMarkers?.length) {
    return markersPositions.map(({ label, lat, lng }) => {
      const isMarkerExists = findMarker(prevMarkers, label);

      if (isMarkerExists) {
        // then update existing marker position
        updateMarkerPosition(isMarkerExists, lat, lng);
        return isMarkerExists;
      }
      // else create new
      return createNewMarker(lat, lng, label);
    });
  }

  return markersPositions.map(({ lat, lng, label }) =>
    createNewMarker(lat, lng, label)
  );
};
