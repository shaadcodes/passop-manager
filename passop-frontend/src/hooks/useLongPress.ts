import React, { useRef, useCallback } from "react";

interface LongPressOptions {
    threshold? : number;
    onStart?: () => void;
    onCancel?: () => void;
}

export const useLongPress = (
    callback: () => void,
    { threshold = 600, onStart, onCancel }: LongPressOptions = {}
) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isLongPressTriggered = useRef<boolean>(false);

    const start = useCallback (
        (_e: React.PointerEvent) => {
            isLongPressTriggered.current = false;
            onStart?.();

            timerRef.current = setTimeout(() => {
                isLongPressTriggered.current = true;
                if(typeof window !== "undefined" && "vibrate" in navigator)
                    navigator.vibrate(50);
                callback();
            }, threshold);
        },
        [callback, threshold, onStart]
    );

    const clear = useCallback(() => {
        if(timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        onCancel?.();
    }, [onCancel]);

    return {
        onPointerDown: start,
        onPointerUp: clear,
        onPointerLeave: clear,
        onPointerCancel: clear,
    };
};