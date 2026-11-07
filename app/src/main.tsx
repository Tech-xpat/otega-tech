import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { initPressFeedback } from './lib/pressFeedback'
import App from './App.tsx'
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
import ScrollToTop from './components/ScrollToTop'

initPressFeedback();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/portfolio/:type" element={<CategoryPage />} />
          <Route path="/portfolio/:type/:subcategory" element={<CategoryPage />} />
          <Route path="/gallery/:category" element={<GalleryPage />} />
          <Route path="/greatness" element={<AdminLogin />} />
          <Route
            path="/greatness/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
