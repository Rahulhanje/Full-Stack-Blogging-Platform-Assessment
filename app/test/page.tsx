export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CSS Test Page</h1>
        <p className="text-gray-600 mb-6">
          If you can see this styled properly, Tailwind CSS is working!
        </p>
        <div className="space-y-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors w-full">
            Primary Button
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors w-full">
            Success Button
          </button>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <strong>Warning:</strong> This is a test alert.
          </div>
        </div>
      </div>
    </div>
  );
}