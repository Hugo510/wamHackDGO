import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store";

interface AppState {
  currentNode: number | null;
  documentModalOpen: boolean;
  selectedDocument: number | null;
  isAuthenticated: boolean;
  loginError: string | null;
  rol: string | null; // Nuevo campo para el rol del usuario
}

const initialState: AppState = {
  currentNode: null,
  documentModalOpen: false,
  selectedDocument: null,
  isAuthenticated: false,
  loginError: null,
  rol: null, // Inicializamos el rol como null
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentNode: (state, action: PayloadAction<number | null>) => {
      state.currentNode = action.payload;
    },
    setDocumentModalOpen: (state, action: PayloadAction<boolean>) => {
      state.documentModalOpen = action.payload;
    },
    setSelectedDocument: (state, action: PayloadAction<number | null>) => {
      state.selectedDocument = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ rol: string }>) => {
      state.isAuthenticated = true;
      state.loginError = null;
      state.rol = action.payload.rol; // Guardamos el rol en el estado
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.loginError = action.payload;
      state.rol = null; // Limpiamos el rol en caso de error
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loginError = null;
      state.rol = null; // Limpiamos el rol al hacer logout
    },
  },
});

export const {
  setCurrentNode,
  setDocumentModalOpen,
  setSelectedDocument,
  loginSuccess,
  loginFailure,
  logout,
} = AppSlice.actions;

export default AppSlice.reducer;

// Async action for login
export const loginUser = (email: string, contraseña: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post("http://192.168.1.177:3000/api/auth/login", { email, contraseña });
    
    if (response.status === 200 && response.data.rol) {
      // Si la respuesta es exitosa y contiene un token y un rol
      const { rol } = response.data; 
      console.log(response.data);
      dispatch(loginSuccess({ rol })); // Despachamos el token y rol al estado
    } else {
      dispatch(loginFailure("Invalid credentials"));
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "An error occurred"));
  }
};
