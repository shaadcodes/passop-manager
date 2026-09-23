import React, { type ReactNode } from 'react';
interface SwitchProps {
    condition: boolean;
    setCondition: (condition: any) => void;
    stickerActive?: ReactNode;
    stickerInactive?: ReactNode;
    inactivebg?: string;
    activebg?: string;
    knob?: string;
    height?: string;
    width?: string;
}
declare const Switch: React.FC<SwitchProps>;
export default Switch;
