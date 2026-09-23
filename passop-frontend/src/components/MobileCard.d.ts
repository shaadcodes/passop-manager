import React from "react";
import type { Inputs } from "../types/interfaces";
interface MobileCardProps {
    pass: Inputs;
    onDelete: (id: string) => void;
    onEdit: (pass: Inputs) => void;
}
declare const MobileCard: ({ pass, onDelete, onEdit }: MobileCardProps) => React.JSX.Element;
export default MobileCard;
