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
import CreateCharacter from "./component/CreateCharacter"; // Importa el nuevo componente
import ProtectedRoute from "./component/ProtectedRoute";
import SearchBar from "./component/SearchBar";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <SearchBar onSearch={handleSearch} />
                    <Routes>
                        <Route element={<MainPage />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Characters searchQuery={searchQuery} />} path="/character" />
                        <Route element={<CreateCharacter />} path="/create-character" /> {/* Nueva ruta para crear personajes */}
                        <Route
                            element={
                                <ProtectedRoute>
                                    <Characters searchQuery={searchQuery} />
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
