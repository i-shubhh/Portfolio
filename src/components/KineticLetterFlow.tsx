import React from "react";

interface KineticLetterFlowProps {
  phrase?: string;
  speed?: "normal" | "slow";
}

export const KineticLetterFlow: React.FC<KineticLetterFlowProps> = ({
  phrase = "SHUBHAM JHA · WHAT I HAVE MADE · WHAT I KNOW · CAPABILITIES · WHERE I AM OPEN · WHAT I AM DOING",
  speed = "normal"
}) => {
  return (
    <div className="w-full overflow-hidden py-4 border-b border-white/10 bg-[#050507] select-none">
      <div className="animate-kinetic-flow flex items-center gap-8 whitespace-nowrap text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
        <span className="font-a24 tracking-[0.3em] text-zinc-300 font-semibold">{phrase}</span>
        <span aria-hidden="true" className="text-zinc-600">✦</span>
        <span className="font-a24 tracking-[0.3em] text-zinc-300 font-semibold">{phrase}</span>
        <span aria-hidden="true" className="text-zinc-600">✦</span>
        <span className="font-a24 tracking-[0.3em] text-zinc-300 font-semibold">{phrase}</span>
        <span aria-hidden="true" className="text-zinc-600">✦</span>
        <span className="font-a24 tracking-[0.3em] text-zinc-300 font-semibold">{phrase}</span>
        <span aria-hidden="true" className="text-zinc-600">✦</span>
      </div>
    </div>
  );
};
