
import React from 'react';
import Header from './components/Header.js';
import BACCalculator from './components/BACCalculator.js';
import InfoCard from './components/InfoCard.js';
import Pledge from './components/Pledge.js';
import Footer from './components/Footer.js';
import ExcuseGenerator from './components/ExcuseGenerator.js';

const App = () => {
    return (
        React.createElement("div", { className: "min-h-screen bg-slate-900 font-sans flex flex-col" },
            React.createElement(Header, null),
            React.createElement("main", { className: "flex-grow container mx-auto p-4 md:p-8" },
                React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" },
                    React.createElement("div", { className: "flex flex-col gap-8" },
                        React.createElement(BACCalculator, null),
                        React.createElement(ExcuseGenerator, null)
                    ),
                    React.createElement("div", { className: "flex flex-col gap-8" },
                        React.createElement(InfoCard, { title: "음주운전의 위험성", icon: "fa-triangle-exclamation" },
                            React.createElement("ul", { className: "list-disc list-inside space-y-2 text-slate-300" },
                                React.createElement("li", null, React.createElement("strong", null, "판단력 저하:"), " 알코올은 뇌 기능을 저하시켜 위험 상황에 대한 판단 및 대처 능력을 현저히 떨어뜨립니다."),
                                React.createElement("li", null, React.createElement("strong", null, "반응 시간 지연:"), " 돌발 상황 발생 시 브레이크를 밟거나 핸들을 조작하는 반응 속도가 느려져 사고 위험이 급증합니다."),
                                React.createElement("li", null, React.createElement("strong", null, "시야 제한:"), " 주변 시야가 좁아지고 움직이는 물체를 정확히 파악하기 어려워져 보행자나 다른 차량을 인지하지 못할 수 있습니다."),
                                React.createElement("li", null, React.createElement("strong", null, "자기과신:"), " 소량의 음주로도 운전 실력을 과신하게 되어 과속, 난폭 운전 등 위험한 행동으로 이어지기 쉽습니다.")
                            )
                        ),
                        React.createElement(InfoCard, { title: "법적 처벌 및 책임", icon: "fa-gavel" },
                            React.createElement("p", { className: "text-slate-300 mb-4" }, "음주운전은 단순한 실수가 아닌, 나와 타인의 생명을 위협하는 심각한 범죄 행위입니다. 적발 시 강력한 법적 처벌을 받게 됩니다."),
                            React.createElement("ul", { className: "list-disc list-inside space-y-2 text-slate-300" },
                                React.createElement("li", null, React.createElement("strong", null, "벌금 및 징역:"), " 혈중 알코올 농도 수치에 따라 높은 벌금 또는 징역형에 처해질 수 있습니다."),
                                React.createElement("li", null, React.createElement("strong", null, "면허 정지/취소:"), " 운전면허가 일정 기간 정지되거나 취소되어 일상생활에 큰 불편을 초래합니다."),
                                React.createElement("li", null, React.createElement("strong", null, "보험료 할증:"), " 자동차 보험료가 대폭 인상되며, 사고 발생 시 보험 처리에 제한을 받을 수 있습니다."),
                                React.createElement("li", null, React.createElement("strong", null, "사회적 불이익:"), " 직장 내 징계, 취업 제한 등 심각한 사회적 불이익을 감수해야 할 수 있습니다.")
                            )
                        ),
                        React.createElement(InfoCard, { title: "책임감 있는 대안", icon: "fa-car-side" },
                            React.createElement("p", { className: "text-slate-300 mb-4" }, "술자리가 있다면, 운전대를 잡지 않을 현명한 방법을 미리 계획하세요."),
                            React.createElement("ul", { className: "list-disc list-inside space-y-2 text-slate-300" },
                                React.createElement("li", null, React.createElement("strong", null, "대리운전 이용:"), " 가장 안전하고 보편적인 방법입니다. 스마트폰 앱으로 간편하게 호출할 수 있습니다."),
                                React.createElement("li", null, React.createElement("strong", null, "대중교통 이용:"), " 버스, 지하철 등 대중교통을 이용하여 안전하게 귀가하세요."),
                                React.createElement("li", null, React.createElement("strong", null, "택시/공유 차량 서비스:"), " 택시나 카셰어링 서비스를 이용하여 편리하고 안전하게 이동할 수 있습니다."),
                                React.createElement("li", null, React.createElement("strong", null, "지인에게 부탁하기:"), " 술을 마시지 않은 친구나 가족에게 운전을 부탁하는 것도 좋은 방법입니다.")
                            )
                        ),
                        React.createElement(Pledge, null)
                    )
                )
            ),
            React.createElement(Footer, null)
        )
    );
};

export default App;
