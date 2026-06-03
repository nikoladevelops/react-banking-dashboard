type StatProps = {
  label: string;
  value: string;
};

export default function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  );
}
