import React, { useState, useCallback } from 'react';
import { Gender, DrinkType } from '../types';

interface BACResult {
    bac: number;
    message: string;
    color: string;
}

const DRINK_PROPERTIES = {
    [DrinkType.SOJU]: { abv: 0.18, volume: 50 }, // 소주: 18%, 50ml 잔
    [DrinkType.BEER]: { abv: 0.05, volume: 250 }, // 맥주: 5%, 250ml 잔
    [DrinkType.WHISKEY]: { abv: 0.40, volume: 30 }, // 양주: 40%, 30ml 샷
};


const BACCalculator: React.FC = () => {
    const [weight, setWeight] = useState<number>(70);
    const [gender, setGender] = useState<Gender>(Gender.MALE);
    const [drinkType, setDrinkType] = useState<DrinkType>(DrinkType.SOJU);
    const [drinks, setDrinks] = useState<number>(1);
    const [hours, setHours] = useState<number>(1);
    const [result, setResult] = useState<BACResult | null>(null);

    const getBACStatus = (bac: number): { message: string; color: string } => {
        if (bac <= 0) return { message: '알코올이 거의 분해되었습니다.', color: 'text-green-400' };
        if (bac < 0.03) return { message: '법적 처벌 기준 미만이지만, 운전 능력에 영향을 줄 수 있습니다. 절대 운전하지 마세요.', color: 'text-yellow-400' };
        if (bac < 0.08) return { message: '면허 정지 수준입니다. 심각한 법적 처벌을 받게 됩니다.', color: 'text-orange-500' };
        return { message: '면허 취소 수준입니다. 매우 위험한 상태이며, 강력한 처벌 대상입니다.', color: 'text-red-500' };
    };

    const calculateBAC = useCallback(() => {
        // Widmark 공식 사용, 선택된 주류에 따라 알코올 그램 계산
        const selectedDrink = DRINK_PROPERTIES[drinkType];
        const alcoholGramsPerDrink = selectedDrink.volume * selectedDrink.abv * 0.789; // 알코올 밀도(0.789g/ml) 적용
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        calculateBAC();
    };

    return (
        <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-sky-400 mb-4 flex items-center">
                <i className="fas fa-calculator mr-3"></i>
                혈중 알코올 농도(BAC) 계산기
            </h2>
            <p className="text-sm text-slate-400 mb-6">
                이 계산기는 일반적인 추정치이며 법적 증거로 사용될 수 없습니다.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-slate-300">몸무게 (kg)</label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        min="30"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-slate-300">성별</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as Gender)}
                        className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                    >
                        <option value={Gender.MALE}>남성</option>
                        <option value={Gender.FEMALE}>여성</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="drinkType" className="block text-sm font-medium text-slate-300">마신 술 종류</label>
                    <select
                        id="drinkType"
                        value={drinkType}
                        onChange={(e) => setDrinkType(e.target.value as DrinkType)}
                        className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                    >
                        <option value={DrinkType.SOJU}>소주 (18%)</option>
                        <option value={DrinkType.BEER}>맥주 (5%)</option>
                        <option value={DrinkType.WHISKEY}>양주 (40%)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="drinks" className="block text-sm font-medium text-slate-300">마신 잔 수</label>
                    <input
                        type="number"
                        id="drinks"
                        value={drinks}
                        onChange={(e) => setDrinks(Number(e.target.value))}
                        className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-slate-300">음주 후 경과 시간 (시간)</label>
                    <input
                        type="number"
                        id="hours"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        min="0"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    결과 확인
                </button>
            </form>
            {result && (
                <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-600">
                    <h3 className="text-lg font-bold text-slate-200">예상 결과</h3>
                    <p className={`text-3xl font-mono font-bold my-2 ${result.color}`}>
                        {result.bac.toFixed(3)}%
                    </p>
                    <p className={`text-sm ${result.color}`}>{result.message}</p>
                </div>
            )}
        </div>
    );
};

export default BACCalculator;