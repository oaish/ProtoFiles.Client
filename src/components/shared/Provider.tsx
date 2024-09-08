"use client"

import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import Loader from "@/components/shared/Loader";
import Banner from "@/components/shared/Banner";

interface SliderState {
    id: number;
    content: ReactNode;
    isActive: boolean;
    isLoaded: boolean;
}

interface SliderContextProps {
    handleSlider: (isActive: boolean, content?: ReactNode, duration?: number) => void;
}

const SliderContext = createContext<SliderContextProps | undefined>(undefined);

export const useSlider = () => {
    const context = useContext(SliderContext);
    if (!context) {
        throw new Error('useSlider must be used within a SliderProvider');
    }
    return context;
};

export const SliderProvider = ({children}: { children: React.ReactNode }) => {
    const [componentState, setComponentState] = useState<SliderState>({
        id: 0,
        isActive: true,
        isLoaded: false,
        content: undefined
    });

    const handleSlider = useCallback((isActive: boolean, content: ReactNode = null, duration: number = 800) => {
        const id = new Date().getTime(); // unique id for each update
        setComponentState({id, isActive, content, isLoaded: false});

        setTimeout(() => {
            setComponentState({id, isActive, content, isLoaded: true}); // clear component after duration
        }, duration);
    }, []);

    return (
        <SliderContext.Provider value={{handleSlider}}>
            {children}
            <Banner isActive={componentState.isActive}>
                {
                    componentState.isLoaded ? componentState.content : (componentState.isActive && <Loader/>)
                }
            </Banner>
        </SliderContext.Provider>
    );
};
