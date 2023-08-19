import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyModal from "./pages/MyModal";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";


import "./scss/App.scss";
import useToken from './components/useToken';
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
// import 'bootstrap/dist/css/bootstrap.min.css';
const Customers = React.lazy(() => import("./pages/Customers"));
// const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const CustomerEdit = React.lazy(() => import("./pages/CustomerEdit"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductEdit = React.lazy(() => import("./pages/ProductEdit"));
// const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlankPage = React.lazy(() => import("./pages/BlankPage"));
const Cards = React.lazy(() => import("./pages/Cards"));
const CardDet = React.lazy(() => import("./pages/CardDet"));
// const Login = React.lazy(() => import("./pages/Login"));

function App() {

  const { token, setToken } = useToken();
  console.log("token accepted", token);
  if (!token) {
    return <Login setToken={setToken} />
  }
  else {
    return <BrowserRouter>

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route>

            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:customerId" element={<CustomerEdit />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductEdit />} />
              <Route path="/profile" element={<BlankPage />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/cards/:cardid" element={<CardDet />} />
              <Route path="/discount" element={<BlankPage />} />
              <Route path="/inventory" element={<BlankPage />} />
            </Route>

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  }

}

export default App;
