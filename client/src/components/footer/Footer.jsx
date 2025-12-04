import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-indigo-700/50 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center items-center">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">SoftUni React Project 2025</span>
          </p>
        </div>
      </div>
    </footer>
  );
}