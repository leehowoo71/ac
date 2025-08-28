
import React from 'react';

const InfoCard = ({ title, icon, children }) => {
    return (
        React.createElement("div", { className: "bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700" },
            React.createElement("div", { className: "p-6" },
                React.createElement("h2", { className: "text-2xl font-bold text-amber-400 mb-4 flex items-center" },
                    React.createElement("i", { className: `fas ${icon} mr-3 w-6 text-center` }),
                    title
                ),
                React.createElement("div", { className: "prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300" },
                    children
                )
            )
        )
    );
};

export default InfoCard;
