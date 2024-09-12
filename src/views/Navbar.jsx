
export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
        <li>
          <a href="/" className="text-white font-bold text-xl">
            Nasos
          </a>
        </li>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-white">
              About
            </a>
          </li>
          <li>
            <a href="/projects" className="text-white">
              Projects
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white">
              Contact
            </a>
          </li>
        </ul>
      </ul>
    </nav>
  );
};