/*
 * @license MIT
 * Copyright (c) 2025 Hải Lý Nguyễn
 * Repository: https://github.com/hlxlevi/ReactJS-Portfolio
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
