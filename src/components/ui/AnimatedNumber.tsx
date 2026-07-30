import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  formatter?: (n: number) => string;
  className?: string;
}

export function AnimatedNumber({ value, formatter, className }: AnimatedNumberProps) {
  const spring = useSpring(value, { stiffness: 220, damping: 28, mass: 0.6 });
  const display = useTransform(spring, (v) =>
    formatter ? formatter(v) : Math.round(v).toString()
  );
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
