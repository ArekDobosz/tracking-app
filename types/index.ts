import { Car, Position } from '@prisma/client';

export type CarPosition = Car & { position: Position[] };

export interface Marker {
  label: string;
  lat: number;
  lng: number;
}
