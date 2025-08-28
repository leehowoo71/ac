
import React from 'react';
import Header from './components/Header';
import BACCalculator from './components/BACCalculator';
import DisciplineInfo from './components/DisciplineInfo';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center gap-8">
                <div className="w-full max-w-md">
                    <BACCalculator />
                </div>
                <DisciplineInfo />
            </main>
            <Footer />
        </div>
    );
};

export default App;