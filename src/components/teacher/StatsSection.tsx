
import React from "react";
import StatsCard from "./StatsCard";

interface StatsSectionProps {
  classCount: number;
  resourceCount: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ classCount, resourceCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard icon="video" count={classCount} label="Total Classes" />
      <StatsCard icon="users" count={156} label="Active Students" />
      <StatsCard icon="resource" count={resourceCount} label="Available Resources" />
      <StatsCard icon="calendar" count={4} label="Upcoming Sessions" />
    </div>
  );
};

export default StatsSection;
