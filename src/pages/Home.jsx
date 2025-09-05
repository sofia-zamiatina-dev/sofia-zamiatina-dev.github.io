import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeDown, cardsStagger, cardItem } from "../animations/homeAnimations";
import HomeCard from "../components/HomeCard";

export default function Home() {
  return (
    <div className="p-8 md:p-10 max-w-5xl text-foreground bg-background min-h-screen">
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

      {/* Cards */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={cardsStagger}
      >
        <motion.div variants={cardItem}>
          <HomeCard
            to="/works"
            title="Explore Works"
            desc="Selected projects across web, games, and ML—short write-ups, stacks, and demos."
            color="sky"
          />
        </motion.div>

        <motion.div variants={cardItem}>
          <HomeCard
            to="/about"
            title="About Me"
            desc="Background, values, and what I’m learning at UniMelb. Quick timeline + skills."
            color="violet"
          />
        </motion.div>

        <motion.div variants={cardItem}>
          <HomeCard
            to="/contact"
            title="Contact"
            desc="Reach out for collaborations, freelance work, or a friendly chat."
            color="amber"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
