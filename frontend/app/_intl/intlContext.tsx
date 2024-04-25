import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LangContextType {
  lang: 'en' | 'ja';
  setLang: (lang: 'en' | 'ja') => void;
}

const LangContext = createContext<LangContextType>({
	lang: 'en',
	setLang: () => {}
	});
	
	export const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [lang, setLang] = useState<'en' | 'ja'>('en'); // 言語の初期値を英語とする
	
	return (
	<LangContext.Provider value={{ lang, setLang }}>
	{children}
	</LangContext.Provider>
	);
	};
	
	export const useLang = () => useContext(LangContext);