import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const Stack = ({
  cards,
  randomRotation = false,
  sensitivity = 200,
  sendToBackOnClick = true,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  className = ''
}) => {
  const cardCount = Array.isArray(cards) ? cards.length : 0;

  const cardIds = useMemo(() => {
    return (cards || []).map((card, index) => {
      const reactKey = card?.key;
      return reactKey != null ? String(reactKey) : String(index);
    });
  }, [cards]);

  const [order, setOrder] = useState(() => cardIds);
  const [isPaused, setIsPaused] = useState(false);
  const rotationsRef = useRef(new Map());

  useEffect(() => {
    setOrder(cardIds);
  }, [cardIds]);

  const getRotation = (id, indexInStack) => {
    if (!randomRotation) {
      return clamp((indexInStack - (cardCount - 1) / 2) * 2, -6, 6);
    }

    if (!rotationsRef.current.has(id)) {
      const angle = (Math.random() * 10 - 5) * 0.9;
      rotationsRef.current.set(id, clamp(angle, -7, 7));
    }

    return rotationsRef.current.get(id);
  };

  const sendToBack = (id) => {
    setOrder((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((x) => x !== id);
      next.unshift(id);
      return next;
    });
  };

  useEffect(() => {
    if (!autoplay || cardCount <= 1) return;
    if (pauseOnHover && isPaused) return;

    const timer = setInterval(() => {
      setOrder((prev) => {
        if (prev.length <= 1) return prev;
        const next = [...prev];
        const top = next.pop();
        next.unshift(top);
        return next;
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, cardCount, isPaused, pauseOnHover]);

  if (!cards || cardCount === 0) return null;

  const topId = order[order.length - 1];

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
    >
      {order.map((id, positionIndex) => {
        const originalIndex = cardIds.indexOf(id);
        const card = cards[originalIndex];
        const isTop = id === topId;

        const depthFromTop = (order.length - 1) - positionIndex;
        const scale = 1 - depthFromTop * 0.05;
        const yOffset = depthFromTop * 10;
        const rotation = getRotation(id, positionIndex);

        return (
          <motion.div
            key={id}
            className="absolute inset-0"
            style={{ zIndex: positionIndex }}
            initial={false}
            animate={{
              y: yOffset,
              scale,
              rotate: rotation,
              opacity: 1
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              whileTap={isTop ? { scale: 0.98 } : undefined}
              drag={isTop}
              dragElastic={0.15}
              dragMomentum={false}
              onDragEnd={(event, info) => {
                const distance = Math.hypot(info.offset.x, info.offset.y);
                if (distance >= sensitivity) sendToBack(id);
              }}
              onClick={() => {
                if (isTop && sendToBackOnClick) sendToBack(id);
              }}
              style={{
                pointerEvents: isTop ? 'auto' : 'none'
              }}
            >
              {card}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Stack;
