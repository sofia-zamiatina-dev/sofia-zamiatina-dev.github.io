import { motion } from "framer-motion";
import { fadeDown, cardsStagger, cardItem } from "../animations/homeAnimations";
import { pageVariants } from "../animations/pageVariants";
import HolographicCard from "../components/HolographicCard.jsx";

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-8 md:p-10 max-w-5xl text-foreground bg-background min-h-screen"
    >
      <motion.h1
        className="text-3xl md:text-4xl font-semibold mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeDown}
      >
        Hi, I’m Sofia.
      </motion.h1>

      <motion.p
        className="text-foreground/80 leading-relaxed mb-8 max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={fadeDown}
        transition={{ delay: 0.08 }}
      >
        I build interactive software and playful experiences. Pick a card to explore my work, learn about me, or get in touch.
      </motion.p>

      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={cardsStagger}
      >
        <motion.div variants={cardItem}>
          <HolographicCard
            to="/works"
            title="Explore Works"
            desc="Selected projects across web, games, and ML—short write-ups, stacks, and demos."
            color="sky"
          />
        </motion.div>

        <motion.div variants={cardItem}>
          <HolographicCard
            to="/about"
            title="About Me"
            desc="Background, values, and what I’m learning at UniMelb. Quick timeline + skills."
            color="violet"
          />
        </motion.div>

        <motion.div variants={cardItem}>
          <HolographicCard
            to="/contact"
            title="Contact"
            color="amber"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}