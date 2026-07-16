import { useEffect, useState } from "react";

export default function ToastModal({ message, onClose }) {
  const [visible, setVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Start exit animation after 4 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      // Allow exit animation to play before unmounting
      const timer = setTimeout(() => {
        setIsRendered(false);
        if (onClose) onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-red-500/90 backdrop-blur-md text-white px-5 py-4 rounded-cobalt-lg shadow-2xl border border-red-400/30 transition-all duration-300 transform ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      }`}
    >
      {/* Alert Icon */}
      <svg
        className="w-6 h-6 flex-shrink-0 text-red-100 animate-pulse"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      <div className="flex-1">
        <p className="font-semibold text-sm tracking-wide uppercase text-red-100">Error</p>
        <p className="text-[0.92rem] font-medium leading-snug">{message}</p>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-red-100 hover:text-white transition-colors duration-150 p-1 hover:bg-white/10 rounded-full"
        aria-label="Close"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
