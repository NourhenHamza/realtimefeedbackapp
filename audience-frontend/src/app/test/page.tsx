export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tailwind Test
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          If you see colors and styling, Tailwind is working!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
          Click Me
        </button>
      </div>
    </div>
  )
}