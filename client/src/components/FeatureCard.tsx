import React from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
};

export default function FeatureCard({
  icon,
  title,
  desc,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white dark:bg-custom-dark dark:border-white/10 dark:text-gray-200 p-6 shadow-sm ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 dark:bg-custom-dark">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  );
}
