type TestimonialProps = {
  quote: string;
  author?: string;
};

export default function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <blockquote className="rounded-xl border p-6 bg-white dark:bg-custom-dark">
      <p className="text-gray-700 dark:text-gray-300">{quote}</p>
      {author && (
        <cite className="mt-4 block font-semibold text-sm">{author}</cite>
      )}
    </blockquote>
  );
}
