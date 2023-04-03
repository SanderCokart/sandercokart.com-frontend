import type {ReactNode} from 'react';

import {Header, ScrollProgressIndicator, Footer, MobileNavigation} from '@/layouts/RootLayout/index';

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="sticky top-0 z-50 bg-primary dark:bg-primaryDark shadow-2xl">
                <Header/>
                <MobileNavigation/>
                <ScrollProgressIndicator/>
            </div>
            {children}
            <Footer/>
        </>
    );
};

export default RootLayout;