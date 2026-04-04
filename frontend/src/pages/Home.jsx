import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Intelligent transit for modern campuses.
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            Manage fleets, track real-time attendance, and simplify student commutes with our minimal, all-in-one transport management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 rounded-xl text-base font-medium transition-all shadow-md hover:shadow-lg">
              Get Started
            </Link>
            <Link to="/login" className="flex items-center justify-center bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 px-8 py-3 rounded-xl text-base font-medium transition-all shadow-sm">
              Login to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Bus Management</h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Coordinate buses, assign routes, and manage drivers dynamically from a centralized command center.
            </p>
          </Card>
          
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Digital Attendance</h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Log daily attendance effortlessly. Keep records highly accurate and instantly accessible across roles.
            </p>
          </Card>
          
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Instant Notifications</h3>
            <p className="text-gray-500 text-base leading-relaxed">
              Broadcast critical updates, shift delays, and transport notices directly to your campus instantaneously.
            </p>
          </Card>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8">
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Campus Transport. Built for educational facilities.
        </p>
      </footer>
    </div>
  );
};
