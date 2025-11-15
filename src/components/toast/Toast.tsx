"use client";

import { motion } from "motion/react";
import { useToast } from "@/providers/ToastProvider";

export default function Toast() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 font-figtree">
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            px-4 py-3 rounded-xl shadow-lg text-white 
            ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }
          `}
        >
          {toast.message}
        </motion.div>
      ))}
    </div>
  );
}
