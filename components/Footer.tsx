export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">BlogPlatform</h3>
            <p className="text-gray-300 mb-4">
              A modern blogging platform where you can share your thoughts and ideas with the world.
              Built with Next.js, TypeScript, and modern web technologies.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="/categories" className="text-gray-300 hover:text-white">Categories</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Create Posts</li>
              <li className="text-gray-300">Manage Categories</li>
              <li className="text-gray-300">Markdown Support</li>
              <li className="text-gray-300">Responsive Design</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 BlogPlatform. Built with ❤️ using Next.js and TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}