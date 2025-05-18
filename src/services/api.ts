import axios from "axios";
import {
  CreateOfferRequest,
  CreateOfferResponse,
  GetOffersResponse,
} from "@/types/user";

// API temel URL'leri
const PRODUCT_API_URL = "http://localhost:8082";
const AUTH_API_URL = "http://localhost:8001";
const OFFER_API_URL = "http://localhost:8070/api/v1";

// Axios instance'larını oluşturuyoruz
const productApi = axios.create({
  baseURL: PRODUCT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const offerApi = axios.create({
  baseURL: OFFER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // CORS sorunlarını önlemek için
  withCredentials: true,
});

// Token'ı saklayacak değişkenimiz
let authToken: string | null = null;

// Axios interceptor ile tüm isteklere token ekliyoruz (varsa)
productApi.interceptors.request.use((config: any) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

offerApi.interceptors.request.use(
  (config: any) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Offer API isteği: ${config.url} - Token var`);
    } else {
      console.log(`Offer API isteği: ${config.url} - Token YOK!`);
    }
    return config;
  },
  (error) => {
    console.error("Offer API request interceptor error:", error);
    return Promise.reject(error);
  }
);

// API yanıtlarında hata ayıklama için interceptor
offerApi.interceptors.response.use(
  (response) => {
    console.log(`Offer API yanıtı (${response.config.url}):`, response.status);
    return response;
  },
  (error) => {
    console.error(
      "Offer API error:",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// Auth işlemleri
export const authService = {
  setToken: (token: string) => {
    authToken = token;
    localStorage.setItem("token", token);
    console.log("Token set:", token.substring(0, 15) + "...");
  },

  getToken: () => {
    if (!authToken) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        authToken = storedToken;
        console.log(
          "Token retrieved from localStorage:",
          authToken.substring(0, 15) + "..."
        );
      }
    }
    return authToken;
  },

  clearToken: () => {
    console.log("Token cleared");
    authToken = null;
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    const token = authService.getToken();
    const isAuth = !!token;
    console.log("Authentication check:", isAuth);
    return isAuth;
  },
};

// Product API işlemleri
export const productService = {
  // Tüm ürünleri getir
  getAllProducts: async (category?: string) => {
    try {
      const url = category ? `/products?category=${category}` : "/products";
      const response = await productApi.get(url);
      console.log("API Response (getAllProducts):", response.data);

      // Detaylı log - örnek bir ürünün yapısını görelim
      if (response.data?.data?.length > 0) {
        const sampleProduct = response.data.data[0];
        console.log("Sample product structure:", {
          ID: sampleProduct.ID,
          Title: sampleProduct.Title,
          Price: sampleProduct.Price,
          CategoryID: sampleProduct.CategoryID,
          // Diğer tüm alanları kontrol edelim
          allFields: Object.keys(sampleProduct),
        });
      }

      return response.data;
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
      throw error;
    }
  },

  // ID'ye göre ürün detaylarını getir
  getProductById: async (id: string | number) => {
    try {
      const response = await productApi.get(`/products/${id}`);
      console.log("API Response (getProductById):", response.data);

      // Detaylı ürün yapısını logla
      if (response.data?.data) {
        console.log("Product detail structure:", {
          ID: response.data.data.ID,
          Title: response.data.data.Title,
          Price: response.data.data.Price,
          // Diğer tüm alanları kontrol edelim
          allFields: Object.keys(response.data.data),
        });
      }

      return response.data;
    } catch (error) {
      console.error(
        `Ürün detayları yüklenirken hata oluştu (ID: ${id}):`,
        error
      );
      throw error;
    }
  },

  // Yeni ürün oluştur
  createProduct: async (productData: any) => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error("Bu işlem için giriş yapmalısınız");
      }

      const response = await productApi.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error("Ürün oluşturulurken hata oluştu:", error);
      throw error;
    }
  },

  // Ürün güncelle
  updateProduct: async (id: string | number, productData: any) => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error("Bu işlem için giriş yapmalısınız");
      }

      const response = await productApi.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Ürün güncellenirken hata oluştu (ID: ${id}):`, error);
      throw error;
    }
  },

  // Teklif oluştur
  createOffer: async (productId: number, amount: number) => {
    try {
      const token = authService.getToken();
      if (!token) {
        console.error("Token bulunamadı, kullanıcı giriş yapmamış olabilir");
        throw new Error("Teklif vermek için giriş yapmalısınız");
      }

      console.log("Teklif gönderiliyor:", {
        productId,
        amount,
        tokenExists: !!token,
      });

      // productId'yi URL'de gönderiyoruz, body'de sadece amount var
      const response = await offerApi.post(`/offer/create/${productId}`, {
        amount,
      });
      return response.data;
    } catch (error) {
      console.error(`Teklif oluşturulurken hata oluştu:`, error);
      throw error;
    }
  },

  // Teklifleri getir
  getOffersByProductId: async (userId: string) => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error("Teklifleri görmek için giriş yapmalısınız");
      }

      console.log(`Kullanıcının (${userId}) teklifleri alınıyor`);

      const response = await offerApi.get(`/offer/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Teklifler yüklenirken hata oluştu:`, error);
      throw error;
    }
  },
};

// Uygulama ilk yüklendiğinde token'ı localStorage'dan alıyoruz
authService.getToken();

export default {
  productService,
  authService,
};
