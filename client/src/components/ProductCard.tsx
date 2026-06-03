type ProductCardProps = {
  title: string;
  desc: string;
  price: string;
  features: string[];
  cta: string;
  primary?: boolean;
};

export default function ProductCard({
  title,
  desc,
  price,
  features,
  cta,
  primary = false,
}: ProductCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:bg-custom-dark dark:border-white/10 dark:text-gray-200 p-6 shadow-sm flex flex-col">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{desc}</p>
      </div>

      <div className="mt-6 flex-1">
        <div className="text-2xl font-bold">{price}</div>
        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          className={`w-full rounded-md px-4 py-2 font-semibold transition transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg ${
            primary
              ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              : "border border-indigo-600 dark:border-green-400 dark:bg-custom-dark text-indigo-600 dark:text-gray-200"
          } hover-themed`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
