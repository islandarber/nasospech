import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white text-center px-4 font-poiretone">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-gray-300">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-orange-500 text-white py-3 px-8 rounded-md text-lg hover:bg-orange-600 transition-colors duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
};
