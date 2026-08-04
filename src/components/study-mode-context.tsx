"use client"

import { createContext, useContext, useState, ReactNode } from "react"

const StudyModeContext = createContext<{
    isStudying: boolean
    setIsStudying: (v: boolean) => void
}>({ isStudying: false, setIsStudying: () => {} })

export function StudyModeProvider({ children }: { children: ReactNode }) {
    const [isStudying, setIsStudying] = useState(false)
    return (
        <StudyModeContext.Provider value={{ isStudying, setIsStudying }}>
            {children}
        </StudyModeContext.Provider>
    )
}

export function useStudyMode() {
    return useContext(StudyModeContext)
}
