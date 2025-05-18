export interface Address {
  _id?: string;
  cityName: string;
  countyName: string;
  districtName: string;
  addressText: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: string[];
  defaultAddress: string;
  isSeller: boolean;
  isVerified: boolean;
  token?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: {
    cityName: string;
    countyName: string;
    districtName: string;
    addressText: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export interface ApiError {
  success: false;
  message: string;
}

// Teklif istekleri ve yanıtları için tipler
export interface CreateOfferRequest {
  productId: number;
  amount: number;
}

export interface CreateOfferResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface GetOffersResponse {
  success: boolean;
  message?: string;
  data?: any[];
}
