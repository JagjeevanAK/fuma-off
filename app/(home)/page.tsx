import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-900">
      {/* Hero section */}
      <div className="w-full bg-[#FFD54F] dark:bg-[#4A4A4A] py-16 flex flex-col items-center">
        <div className="container px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8">
            <Image
              src="/images/Open_Food_Facts_logo.svg"
              alt="Open Food Facts"
              width={300}
              height={80}
              className="block dark:hidden"
            />
            <Image
              src="/images/open_food_facts_logo_dark.svg"
              alt="Open Food Facts"
              width={300}
              height={80}
              className="hidden dark:block"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Food knowledge for all
          </h1>
          <p className="text-xl mb-8 max-w-3xl text-gray-700 dark:text-gray-200">
            Open Food Facts is a collaborative, free and open database of food products 
            from around the world. Browse our API documentation to integrate with our data.
          </p>
          <Link 
            href="/docs" 
            className="rounded-full px-8 py-4 bg-[#28A745] hover:bg-[#218838] text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Explore API Documentation
          </Link>
        </div>
      </div>

      {/* Features section */}
      <div className="container px-4 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Comprehensive API</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access detailed information about food products from around the world with our powerful API.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Open Data</h2>
            <p className="text-gray-600 dark:text-gray-300">
              All data is openly available and can be reused for free under the Open Database License.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Community Driven</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join our global community of contributors helping to build the world's largest food database.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
