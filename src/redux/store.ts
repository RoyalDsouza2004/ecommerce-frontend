import { configureStore } from "@reduxjs/toolkit"
import { productAPI } from "./api/productAPI"
import { userAPI } from "./api/userAPI"
import { userReducer } from "./reducer/userReducer"
import { cartReducer } from "./reducer/cartReducer"
import { orderAPI } from "./api/orderAPI"
import { dashboardAPI } from "./api/dashboardAPI"
import { paymentAPI } from "./api/paymentAPI"

export const server = import.meta.env.VITE_SERVER

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [paymentAPI.reducerPath]: paymentAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware , productAPI.middleware , orderAPI.middleware , dashboardAPI.middleware , paymentAPI.middleware ),
})

export type RootState= ReturnType<typeof store.getState>