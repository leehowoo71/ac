
import React, { useState } from 'react';

const Pledge = () => {
    const [pledged, setPledged] = useState(false);

    const handlePledge = () => {
        setPledged(true);
    };

    return (
        React.createElement("div", { className: "bg-gradient-to-br from-green-800 to-emerald-900 rounded-xl shadow-lg p-6 border border-emerald-700 text-center" },
            React.createElement("h2", { className: "text-2xl font-bold text-white mb-4 flex items-center justify-center" },
                React.createElement("i", { className: "fas fa-check-circle mr-3" }),
                "안전 운전 서약"
            ),
            React.createElement("p", { className: "text-emerald-200 mb-6" }, "나와 우리 모두의 안전을 위해, 음주 후 절대 운전하지 않을 것을 서약합니다."),
            pledged ? (
                React.createElement("div", { className: "bg-emerald-100 text-emerald-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center" },
                    React.createElement("i", { className: "fas fa-shield-halved mr-2" }),
                    "서약해 주셔서 감사합니다! 안전한 귀가를 응원합니다."
                )
            ) : (
                React.createElement("button", {
                    onClick: handlePledge,
                    className: "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                }, "서약하기")
            )
        )
    );
};

export default Pledge;
