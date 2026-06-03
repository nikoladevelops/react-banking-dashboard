type Props = { q: string; a: string };

export default function FAQItem({ q, a }: Props) {
  return (
    <details className="rounded-lg border bg-white dark:bg-custom-dark">
      <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
        {q}
      </summary>
      <div className="border-t px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
        {a}
      </div>
    </details>
  );
}
