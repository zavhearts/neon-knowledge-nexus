
import React from "react";
import StatsCard from "./StatsCard";

interface StatsSectionProps {
  classCount: number;
  resourceCount: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ classCount, resourceCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard icon="video" count={classCount} label="Total Classes" />
      <StatsCard icon="users" count={156} label="Students" />
      <StatsCard icon="resource" count={resourceCount} label="Resources" />
      <StatsCard icon="calendar" count={4} label="Live Sessions" />
    </div>
  );
};

export default StatsSection;
