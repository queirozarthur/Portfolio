// 21st.dev — Flip Words por Aceternity UI
// https://21st.dev/@manuarora700/components/flip-words
// Adaptado: limpa o timer ao desmontar e a saída é mais contida (sem o scale 2x do original).
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type FlipWordsProps = {
  words: readonly string[];
  duration?: number;
  className?: string;
};

export function FlipWords({ words, duration = 2800, className }: FlipWordsProps) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] ?? words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (isAnimating) return;
    const id = window.setTimeout(next, duration);
    return () => window.clearTimeout(id);
  }, [isAnimating, duration, next]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        exit={{ opacity: 0, y: -28, filter: "blur(8px)", position: "absolute" }}
        className={cn("relative z-10 inline-block text-left", className)}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: wordIndex * 0.18, duration: 0.3 }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: wordIndex * 0.18 + letterIndex * 0.03, duration: 0.3 }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}
