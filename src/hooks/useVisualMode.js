import { useState, useCallback } from 'react'

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    console.log("useVisualMode", history);

    // function transition(second, replace = false) {
    //     setMode(second);
    //     if (replace === true) {
    //         const tempHistory = [...history]
    //         console.log("Temp History", tempHistory)
    //         setHistory(prev => [...tempHistory, second]);
    //     } else {
    //         setHistory(prev => ([...prev, second]));
    //     }
    // }

    const transition = (newMode, replace = false) => {
        if (replace) {
            const newHist = history.slice(0, history.length - 1);
            setHistory([...newHist, newMode]);
        } else {
            setHistory([...history, newMode]);
        }
        setMode(newMode);
    };
    const back = () => {
        const newHist = history.slice(0, history.length - 1);
        const prevMode = history.slice(history.length - 2)[0]; // prevMode is the second last element of the history state (because the last history element is the current mode). Slice will wrap around indexes less than 0 so prevMode will always contain at least one element.
        setHistory(newHist);
        setMode(prevMode);
    };

    // function back() {
    //     const tempHistory = [...history]
    //     if (tempHistory.length > 1) {
    //         tempHistory.pop()
    //     }
    //     setHistory(tempHistory);
    //     setMode(tempHistory[(tempHistory.length - 1)])

    // }

    return { mode, transition, back };
}