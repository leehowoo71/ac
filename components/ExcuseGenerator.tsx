
import React, { useState } from 'react';
import { generateExcuse } from '../services/geminiService';

const ExcuseGenerator: React.FC = () => {
    const [situation, setSituation] = useState('');
    const [excuse, setExcuse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!situation.trim()) {
            setError('상황을 입력해주세요.');
            return;
        }
        setLoading(true);
        setError(null);
        setExcuse('');
        try {
            const result = await generateExcuse(situation);
            setExcuse(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('메시지를 생성하는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-violet-400 mb-4 flex items-center">
                <i className="fas fa-comment-dots mr-3"></i>
                AI 음주 거절 도우미
            </h2>
            <p className="text-sm text-slate-400 mb-4">
                술을 거절하기 어려운 상황에 처하셨나요? AI가 자연스럽고 정중한 거절 멘트를 만들어 드립니다.
            </p>
            <div className="space-y-4">
                <div>
                    <label htmlFor="situation" className="block text-sm font-medium text-slate-300">
                        어떤 상황인가요? (예: 회사 회식, 친구들과의 모임)
                    </label>
                    <input
                        type="text"
                        id="situation"
                        value={situation}
                        onChange={(e) => setSituation(e.target.value)}
                        placeholder="상황을 간단히 설명해주세요"
                        className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            생성 중...
                        </>
                    ) : (
                        '거절 멘트 생성하기'
                    )}
                </button>
            </div>
            {error && (
                <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg">
                    {error}
                </div>
            )}
            {excuse && (
                <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-600">
                    <h3 className="text-lg font-bold text-slate-200 mb-2">추천 멘트:</h3>
                    <p className="text-violet-200 italic">"{excuse}"</p>
                </div>
            )}
        </div>
    );
};

export default ExcuseGenerator;