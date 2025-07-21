import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

function Main({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

export default Main;
