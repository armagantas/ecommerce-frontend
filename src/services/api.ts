import axios from "axios";

// API temel URL'leri
const PRODUCT_API_URL = "http://localhost:8082";
const AUTH_API_URL = "http://localhost:8001";

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

// Token'ı saklayacak değişkenimiz
let authToken: string | null = null;

// Axios interceptor ile tüm isteklere token ekliyoruz (varsa)
productApi.interceptors.request.use((config: any) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Auth işlemleri
export const authService = {
  setToken: (token: string) => {
    authToken = token;
    localStorage.setItem("token", token);
  },

  getToken: () => {
    if (!authToken) {
      authToken = localStorage.getItem("token");
    }
    return authToken;
  },

  clearToken: () => {
    authToken = null;
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!authService.getToken();
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
};

// Uygulama ilk yüklendiğinde token'ı localStorage'dan alıyoruz
authService.getToken();

export default {
  productService,
  authService,
};
