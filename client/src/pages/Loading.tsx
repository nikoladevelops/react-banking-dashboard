export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center w-full">
      <div className="text-center">
        <p className="text-2xl text-gray-600 dark:text-gray-400 mt-4">
          Loading...
        </p>
        <p className="mt-6 inline-block px-6 py-3 dark:text-white text-gray-500 rounded-lg">
          Please wait while we load your content.
        </p>
      </div>
    </div>
  );
}
