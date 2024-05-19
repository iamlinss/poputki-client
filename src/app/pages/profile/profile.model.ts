export interface CarData {
  id?: number;
  brand: string;
  model: string;
  color: string;
  plateNumber: string;
}

export interface CityData {
  id: number;
  city: string;
  country?: string;
}

export interface ProfileData {
  birthDate: string;
  cars: CarData[];
  email: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  rate: number;
  tripAmount: number;
  registrationDate: string;
  description: string;
  phone: string;
}

export interface EditProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  description: string;
}

export interface TripData {
  id?: number;
  departureLocationId: number;
  destinationLocationId: number;
  departureDateTime: string;
  description: string;
  seats: number;
  status?: {
    id: number;
    status: string;
  };
  userId: string;
  carId: number;
}

export interface DriverTripData {
  car: CarData;
  departureDateTime: string;
  departureLocation: CityData;
  description: string;
  destinationLocation: CityData;
  id: number;
  seats: number;
  status?: {
    id: number;
    status: string;
  };
  userId: number;
}
