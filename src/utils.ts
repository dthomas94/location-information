export interface Location {
	name: string;
	population: number;
  location: { lat: number; long: number };
  geonamesID: number;
}

export interface Filters {
  country: string;
  limit: number;
}
