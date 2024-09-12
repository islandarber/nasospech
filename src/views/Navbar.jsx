
export const Navbar = () => {
  return (
    <nav className="bg-transparent p-4 font-montserrat">
      <ul className="flex justify-between items-center">
        <li>
          <a href="/" className="text-white text-l">
            Nasos<strong>Pechlivanidis</strong>
            <br />
            Nocturnal<strong>AudioDesign</strong>
          </a>
        </li>
        <ul className="flex space-x-4 text-xs">
          <li>
            <a href="/" className="text-white">
              Short-Movies
            </a>
          </li>
          <li>
            <a href="/about" className="text-white">
              Theater
            </a>
          </li>
          <li>
            <a href="/projects" className="text-white">
              Bio
            </a>
          </li>
          <li>
            <a href="/contact" className="text-white">
              On going
            </a>
          </li>
        </ul>
      </ul>
    </nav>
  );
};