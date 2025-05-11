
import React from "react";
import StatsCard from "./StatsCard";
import { motion } from "framer-motion";

interface StatsSectionProps {
  classCount: number;
  resourceCount: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ classCount, resourceCount }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <StatsCard icon="video" count={classCount} label="Total Classes" />
      <StatsCard icon="users" count={156} label="Active Students" />
      <StatsCard icon="resource" count={resourceCount} label="Available Resources" />
      <StatsCard icon="calendar" count={4} label="Upcoming Sessions" />
    </motion.div>
  );
};

export default StatsSection;
