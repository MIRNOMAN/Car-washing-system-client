import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { persistor, store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
