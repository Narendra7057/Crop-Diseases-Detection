import React from "react";

export const MainLayout = ({ children, isDark }) => {
  return (
    <div className={`${isDark ? "dark bg-gray-900 text-white" : ""}`}>
      <main className={isDark ? "bg-gray-900 text-white" : ""}>
        {children}
      </main>

      {/* Footer */}
      <footer className={`${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-900 text-gray-300"} py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🌾</span> CropGuard
              </h3>
              <p className="text-sm">AI-powered crop disease detection for farmers worldwide.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400">Features</a></li>
                <li><a href="#" className="hover:text-green-400">Pricing</a></li>
                <li><a href="#" className="hover:text-green-400">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400">About</a></li>
                <li><a href="#" className="hover:text-green-400">Blog</a></li>
                <li><a href="#" className="hover:text-green-400">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400">Documentation</a></li>
                <li><a href="#" className="hover:text-green-400">Contact</a></li>
                <li><a href="#" className="hover:text-green-400">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-800"} pt-8`}>
            <p className="text-center text-sm">© 2024 CropGuard. All rights reserved. | Made with ❤️ for farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
