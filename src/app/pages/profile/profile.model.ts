export interface CarData {
  id?: number;
  brand: string;
  model: string;
  color: string;
  plateNumber: string;
  maxSeats: number;
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
  reviews: Array<{
    rating: number;
    comment: string;
  }>
}

export interface EditProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  description: string;
  role: string | null;
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
  price: number;
}

export interface DriverTripData {
  car: CarData;
  departureDateTime: string;
  departureLocation: CityData;
  description: string;
  destinationLocation: CityData;
  id: number;
  seats: number;
  status: string;
  userId: number;
  driverName: string;
  price: number;
  hasPendingPassengers: boolean;
}


export interface PassengerTripData {
  id: number;
  passengerSeats: number;
  passengerStatus: string | null;
  tripDetails:{
    departureDateTime: string;
    departureLocation: CityData;
    destinationLocation: CityData;
    car: CarData;
    driverName: string;
    price: number;
    seats:  number;
    status: string;
  }
}




export interface PassengerData {
  id: number;
  tripId: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    rate: number;
  };
  seats: number;
  status: string;
  driverRating: number;
  passengerRating: number;
  driverComment: string;
  passengerComment: string;
}
