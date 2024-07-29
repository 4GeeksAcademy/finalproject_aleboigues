import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Signup from "./component/SignUp";
import Login from "./component/LogIn";
import MainPage from "./component/MainPage";
import Characters from "./pages/Characters";
import ProtectedRoute from "./component/ProtectedRoute";
import SearchBar from "./component/SearchBar"; // Importar SearchBar

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log('Search query:', query);
        // Aquí puedes manejar la lógica de búsqueda, por ejemplo, actualizar el estado o realizar una llamada a la API.
    };

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <SearchBar onSearch={handleSearch} /> {/* Agregar la barra de búsqueda */}
                    <Routes>
                        <Route element={<MainPage />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Characters />} path="/character" />
                        <Route
                            element={
                                <ProtectedRoute>
                                    <Characters />
                                </ProtectedRoute>
                            }
                            path="/protected"
                        />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
