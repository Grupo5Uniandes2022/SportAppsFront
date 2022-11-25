import { Athlete } from './athlete.model';
import { SegmentEffort } from './segment.model';
import { Photos } from './photos.model';

export interface Service {
  id: string;
  name: string;
  type: string;
  address: string;
}

export interface Supplier {
  id: string;
  name: string;
  type: string;
}
