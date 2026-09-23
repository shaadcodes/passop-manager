import React, { type ReactNode } from 'react'

interface SwitchProps {
    condition: boolean,
    setCondition: (condition: any) => void,
    stickerActive?: ReactNode,
    stickerInactive?: ReactNode,
    inactivebg?: string,
    activebg?: string,
    knob?: string,
    height?: string,
    width?: string,
}

const Switch: React.FC<SwitchProps> = ({condition, setCondition, stickerActive, stickerInactive, activebg="bg-blue-600", inactivebg="bg-gray-400", knob="bg-white", height="h-6", width="w-11"}) => {
  return (
    <button
            type="button"
            role="switch"
            aria-checked={condition}
            onClick={() => setCondition((condition: boolean) => !condition)}
            className={`relative flex items-center justify-center px-1 ${height} ${width} cursor-pointer rounded-full shrink-0 border dark:border-lprimary/30 transition-colors duration-300 ease-in-out focus:outline-none ${condition ?  activebg : inactivebg }`}
          >
            <span
              className={`absolute left-0.5 pointer-events-none flex items-center justify-center transform border rounded-full ${knob} shadow-md transition duration-100 ease-in-out ring-0 ${condition ? "translate-x-0" : "translate-x-full"}`}
            >{condition ? stickerActive : stickerInactive}</span>
    </button>
  )
}

export default Switch;