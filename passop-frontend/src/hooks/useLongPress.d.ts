import React from "react";
interface LongPressOptions {
    threshold?: number;
    onStart?: () => void;
    onCancel?: () => void;
}
export declare const useLongPress: (callback: () => void, { threshold, onStart, onCancel }?: LongPressOptions) => {
    onPointerDown: (_e: React.PointerEvent) => void;
    onPointerUp: () => void;
    onPointerLeave: () => void;
    onPointerCancel: () => void;
};
export {};
