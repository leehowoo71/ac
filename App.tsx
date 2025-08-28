
import React from 'react';
import Header from './components/Header';
import BACCalculator from './components/BACCalculator';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <BACCalculator />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;