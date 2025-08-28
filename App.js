
import React from 'react';
import Header from './components/Header.js';
import BACCalculator from './components/BACCalculator.js';
import Footer from './components/Footer.js';

const App = () => {
    return (
        React.createElement("div", { className: "min-h-screen bg-slate-900 font-sans flex flex-col" },
            React.createElement(Header, null),
            React.createElement("main", { className: "flex-grow container mx-auto p-4 md:p-8 flex justify-center items-center" },
                React.createElement("div", { className: "w-full max-w-md" },
                    React.createElement(BACCalculator, null)
                )
            ),
            React.createElement(Footer, null)
        )
    );
};

export default App;