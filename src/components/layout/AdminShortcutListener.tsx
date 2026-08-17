"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const AdminShortcutListener: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger on Ctrl + / or Cmd + /
      if ((e.ctrlKey || e.metaKey) && (e.key === "/" || e.key === "?" || e.code === "Slash" || e.keyCode === 191)) {
        e.preventDefault();
        router.push("/admin");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
};
