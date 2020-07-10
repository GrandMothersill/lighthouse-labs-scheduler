import { useState, useCallback } from 'react'

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(second, replace = false) {
        setMode(second);
        if (replace === true) {
            const tempHistory = [...history]
            tempHistory.pop();
            setHistory([...tempHistory, second]);
        } else {
            setHistory([...history, second]);
        }
    }

    function back() {
        const tempHistory = [...history]
        if (tempHistory.length > 1) {
            tempHistory.pop()
        }
        setHistory(tempHistory);
        setMode(tempHistory[(tempHistory.length - 1)])

    }

    return { mode, transition, back };
}