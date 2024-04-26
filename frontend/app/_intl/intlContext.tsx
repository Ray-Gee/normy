"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

interface LangContextType {
  lang: "en" | "ja"
  setLang: (lang: "en" | "ja") => void
}

const LangContext = createContext<LangContextType>({
  lang: "ja",
  setLang: () => {},
})

export const LangProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<"en" | "ja">("ja")

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
