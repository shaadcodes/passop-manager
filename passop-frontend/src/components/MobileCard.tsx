import React, { useState } from "react";
import { useLongPress } from "../hooks/useLongPress";
import { MdClose } from "react-icons/md";
import type { Inputs } from "../types/interfaces";

interface MobileCardProps {
  pass: Inputs;
  onDelete: (id: string) => void;
  onEdit: (pass: Inputs) => void;
}

const MobileCard = ({ pass, onDelete, onEdit }: MobileCardProps) => {
  const [isPressing, setIsPressing] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [copied, setCopied] = useState(false);

  const longPressEvents = useLongPress(() => setShowActionSheet(true), {
    threshold: 500,
    onStart: () => setIsPressing(true),
    onCancel: () => setIsPressing(false),
  });

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(pass.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <div
        {...longPressEvents}
        key={pass._id}
        className={`relative select-none touch-none p-3.5 w-full mx-auto bg-white/60 dark:bg-dprimary border dark:border-lsecondary/30 rounded-xl transition-all duration-300 cursor-pointer ${isPressing ? "scale-95 bg-lprimary/20 border-lsecondary ring-2 ring-lsecondary/50" : "active:scale-[0.98]"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 border dark:border-lsecondary/30 rounded-full bg-lprimary/20 text-dprimary dark:text-lprimary flex items-center justify-center font-bold text-xs uppercase">
              {pass.siteName.slice(0, 1)}
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">
                {pass.siteName}
              </p>
              <p className="text-xs text-gray-500">{pass.username}</p>
            </div>
          </div>
          <div className="right flex flex-col gap-1">
            <button
              type="button"
              className={`flex items-center border text-[10px] gap-1 px-3 py-2 rounded-full transition-all duration-150 active:scale-95 ${
                copied
                  ? "bg-lprimary/40 text-dprimary font-bold border-lsecondary/50"
                  : "bg-dprimary text-lprimary font-semibold border-transparent"
              }`}
              onClick={handleCopy}
            >
              <lord-icon
                src="/assets/copy.json"
                trigger="click"
                className={`size-4`}
              />
              <p className={copied ? `text-lsecondary dark:text-lprimary` : ``}>
                {copied ? "Copied!" : "Copy"}
              </p>
            </button>
            <div className="text-[9px] font-raleway text-gray-400 mt-1.5">
              Hold for options
            </div>
          </div>
        </div>
      </div>

      {showActionSheet && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-300"
          onClick={() => setShowActionSheet(false)}
        >
          <div
            className="w-[95vw] mb-4 bg-white dark:bg-dprimary rounded-2xl p-4 shadow-2xl border border-lsecondary/40 flex flex-col gap-2 animate-in slide-in-from-bottom-5 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-bold text-sm text-dprimary dark:text-white">
                  {pass.siteName}
                </h3>
                <p className="text-xs text-gray-400">{pass.username}</p>
              </div>
              <button
                onClick={() => setShowActionSheet(false)}
                className="p-1 text-gray-400 hover:text-dprimary dark:hover:text-white"
              >
                <MdClose className="size-5" />
              </button>
            </div>
            <button
              onClick={() => {
                setShowActionSheet(false);
                onEdit(pass);
              }}
              className="flex items-center gap-3 w-full p-3 text-sm font-raleway font-semibold text-teal-700 dark:text-lprimary hover:bg-lprimary/10 rounded-xl transition-colors"
            >
              <lord-icon
                src="/assets/edit.json"
                trigger="click"
                className="size-5"
              />
              <span>Edit Password</span>
            </button>
            <button
              onClick={() => {
                setShowActionSheet(false);
                if (window.confirm(`Delete password for ${pass.siteName}?`)) {
                  onDelete(pass._id);
                }
              }}
              className="flex items-center gap-3 w-full p-3 text-sm font-semibold font-raleway text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
            >
              <lord-icon
                src="/assets/delete.json"
                trigger="click"
                className="size-5"
              />
              <span>Delete Password</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileCard;
