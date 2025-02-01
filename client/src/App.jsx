import { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Login from "./Components/Login";
import Home from "./Components/Home";

import ProductPage from "./Pages/ProductPage"
import ProfilePage from "./Pages/ProfilePage"
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './global.scss';


const queryClient = new QueryClient()
const App = () => {

   
  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider>
     <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />  
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </UserProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider> 
  );
};

export default App;
