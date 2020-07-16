import { useState } from 'react'

// Manage mode, mode history, and transitioning between visual modes in appointment slots.
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

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
        const prevMode = history.slice(history.length - 2)[0];
        setHistory(newHist);
        setMode(prevMode);
    };

    return { mode, transition, back };
};