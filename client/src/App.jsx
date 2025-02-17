import { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoginPage from "./Pages//LoginPage";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ProductPage from "./Pages/ProductPage"
import ProfilePage from "./Pages/ProfilePage"
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './global.scss';
import  Alert  from "./Components/Alert";

const queryClient = new QueryClient()
const App = () => {

   
  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider>
    <Alert />
     <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />  
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </Router>
    </UserProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider> 
  );
};

export default App;
