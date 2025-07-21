/*
 * @license MIT
 * Copyright (c) 2025 Hải Lý Nguyễn
 * Github: https://github.com/nhlis
 */

import { ToastContainer } from 'react-toastify';
import { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import RoutesConfig from '@/routes/routes';
import { ScrollToTop } from '@/components/ScrollToTop';

// image.knite.online
// image.knite.online

function App() {
    return (
        <div className="app">
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            <Router>
                <ScrollToTop />
                <Routes>
                    {RoutesConfig.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout || Fragment;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <Page />
                                        </Suspense>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
