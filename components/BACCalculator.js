
import React, { useState, useCallback } from 'react';
import { Gender, DrinkType } from '../types.js';

const DRINK_PROPERTIES = {
    [DrinkType.SOJU]: { abv: 0.18, volume: 50 }, // 소주: 18%, 50ml 잔
    [DrinkType.BEER]: { abv: 0.05, volume: 250 }, // 맥주: 5%, 250ml 잔
    [DrinkType.WHISKEY]: { abv: 0.40, volume: 30 }, // 양주: 40%, 30ml 샷
};

const BACCalculator = () => {
    const [weight, setWeight] = useState(70);
    const [gender, setGender] = useState(Gender.MALE);
    const [drinkType, setDrinkType] = useState(DrinkType.SOJU);
    const [drinks, setDrinks] = useState(1);
    const [hours, setHours] = useState(1);
    const [result, setResult] = useState(null);

    const getBACStatus = (bac) => {
        if (bac <= 0) return { message: '알코올이 거의 분해되었습니다.', color: 'text-green-400' };
        if (bac < 0.03) return { message: '법적 처벌 기준 미만이지만, 운전 능력에 영향을 줄 수 있습니다. 절대 운전하지 마세요.', color: 'text-yellow-400' };
        if (bac < 0.08) return { message: '면허 정지 수준입니다. 심각한 법적 처벌을 받게 됩니다.', color: 'text-orange-500' };
        return { message: '면허 취소 수준입니다. 매우 위험한 상태이며, 강력한 처벌 대상입니다.', color: 'text-red-500' };
    };

    const calculateBAC = useCallback(() => {
        const selectedDrink = DRINK_PROPERTIES[drinkType];
        const alcoholGramsPerDrink = selectedDrink.volume * selectedDrink.abv * 0.789;
        const totalAlcoholGrams = drinks * alcoholGramsPerDrink;
        const bodyWaterRatio = gender === Gender.MALE ? 0.68 : 0.55;
        const bac = ((totalAlcoholGrams / (weight * 1000 * bodyWaterRatio)) * 100) - (hours * 0.015);
        const finalBac = Math.max(0, bac);
        const status = getBACStatus(finalBac);
        setResult({
            bac: finalBac,
            message: status.message,
            color: status.color,
        });
    }, [drinks, gender, weight, hours, drinkType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateBAC();
    };

    return React.createElement("div", { className: "bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700" },
        React.createElement("h2", { className: "text-2xl font-bold text-sky-400 mb-4 flex items-center" },
            React.createElement("i", { className: "fas fa-calculator mr-3" }),
            "혈중 알코올 농도(BAC) 계산기"
        ),
        React.createElement("p", { className: "text-sm text-slate-400 mb-6" }, "이 계산기는 일반적인 추정치이며 법적 증거로 사용될 수 없습니다."),
        React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "weight", className: "block text-sm font-medium text-slate-300" }, "몸무게 (kg)"),
                React.createElement("input", { type: "number", id: "weight", value: weight, onChange: (e) => setWeight(Number(e.target.value)), className: "mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500", min: "30", required: true })
            ),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "gender", className: "block text-sm font-medium text-slate-300" }, "성별"),
                React.createElement("select", { id: "gender", value: gender, onChange: (e) => setGender(e.target.value), className: "mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" },
                    React.createElement("option", { value: Gender.MALE }, "남성"),
                    React.createElement("option", { value: Gender.FEMALE }, "여성")
                )
            ),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "drinkType", className: "block text-sm font-medium text-slate-300" }, "마신 술 종류"),
                React.createElement("select", { id: "drinkType", value: drinkType, onChange: (e) => setDrinkType(e.target.value), className: "mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" },
                    React.createElement("option", { value: DrinkType.SOJU }, "소주 (18%)"),
                    React.createElement("option", { value: DrinkType.BEER }, "맥주 (5%)"),
                    React.createElement("option", { value: DrinkType.WHISKEY }, "양주 (40%)")
                )
            ),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "drinks", className: "block text-sm font-medium text-slate-300" }, "마신 잔 수"),
                React.createElement("input", { type: "number", id: "drinks", value: drinks, onChange: (e) => setDrinks(Number(e.target.value)), className: "mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500", min: "0", required: true })
            ),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "hours", className: "block text-sm font-medium text-slate-300" }, "음주 후 경과 시간 (시간)"),
                React.createElement("input", { type: "number", id: "hours", value: hours, onChange: (e) => setHours(Number(e.target.value)), className: "mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500", min: "0", required: true })
            ),
            React.createElement("button", { type: "submit", className: "w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" }, "결과 확인")
        ),
        result && React.createElement("div", { className: "mt-6 p-4 bg-slate-900 rounded-lg border border-slate-600" },
            React.createElement("h3", { className: "text-lg font-bold text-slate-200" }, "예상 결과"),
            React.createElement("p", { className: `text-3xl font-mono font-bold my-2 ${result.color}` }, `${result.bac.toFixed(3)}%`),
            React.createElement("p", { className: `text-sm ${result.color}` }, result.message)
        )
    );
};

export default BACCalculator;
