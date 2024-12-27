import React from 'react';
import { Skull, Brain, Ghost, LucideIcon } from "lucide-react";

export type IconName = 'skull' | 'brain' | 'ghost';

const iconMap: Record<IconName, LucideIcon> = {
  skull: Skull,
  brain: Brain,
  ghost: Ghost,
};

interface ArtworkIconProps {
  name: IconName;
  className?: string;
}

export function ArtworkIcon({ name, className = "w-6 h-6" }: ArtworkIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}