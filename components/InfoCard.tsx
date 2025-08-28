
import React from 'react';

interface InfoCardProps {
    title: string;
    icon: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => {
    return (
        <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center">
                    <i className={`fas ${icon} mr-3 w-6 text-center`}></i>
                    {title}
                </h2>
                <div className="prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
