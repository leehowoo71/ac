
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 mt-12 py-6 border-t border-slate-700">
            <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                <p>
                    <strong>경고:</strong> 본 애플리케이션에서 제공하는 모든 정보는 교육 및 참고 목적으로만 사용되어야 합니다.
                </p>
                <p className="mt-1">
                    혈중 알코올 농도 계산 결과는 개인의 신체 상태, 건강, 섭취한 음식 등 다양한 요인에 따라 달라질 수 있으며, 법적 효력을 갖지 않습니다.
                </p>
                <p className="mt-2">
                    음주 후에는 절대 운전하지 마십시오.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
