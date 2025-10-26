import React from 'react';

const Logo: React.FC = () => (
    <div className="h-32 w-32 mx-auto mb-6 p-3 rounded-full flex items-center justify-center bg-gray-950 border-4 border-amber-500/50 shadow-lg shadow-amber-400/30">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Gold Roof */}
            <path d="M2 10L12 2L22 10" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {/* S for SIRIN, acting as the walls */}
            <path d="M7 21C7 17.134 10.134 14 14 14H16" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 14C17 17.866 13.866 21 10 21H8" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const Header: React.FC = () => {
    return (
        <header className="text-center animate-slide-in-up">
             <Logo />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide">
                SIRIN COSTRUZIONI S.R.L
            </h1>
            <p className="mt-3 text-lg text-gray-400">
                نظام تسجيل الحضور والانصراف للموظفين
            </p>
        </header>
    );
};

export default Header;