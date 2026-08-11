import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export function TypingAnimation({
  text = "",
  duration = 20,
  className,
  delay = 200,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < text.length) {
        const interval = setInterval(() => {
          setIndex((prevIndex) => {
            if (prevIndex < text.length) {
              setDisplayedText(text.slice(0, prevIndex + 1));
              return prevIndex + 1;
            }
            clearInterval(interval);
            return prevIndex;
          });
        }, duration);

        return () => clearInterval(interval);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, duration, delay]);

  return (
    <p className={cn("text-zinc-600 font-normal leading-relaxed", className)}>
      {displayedText}
      {index < text.length && (
        <span className="inline-block w-0.5 h-4 ml-0.5 bg-[#93d500] animate-pulse align-middle" />
      )}
    </p>
  );
}
