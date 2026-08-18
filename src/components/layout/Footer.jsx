import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiTwitter, FiLinkedin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Viresta</h3>
            <p className="text-secondary-300 text-sm">
              Immersive real-estate visualization through 3D, AR, VR, and interactive digital tours.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-secondary-300 hover:text-white text-sm">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/properties/1/3d" className="text-secondary-300 hover:text-white text-sm">
                  3D viewer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white text-sm">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary-300 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-300 hover:text-white text-sm">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-secondary-300 text-sm">
                <FiPhone className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-secondary-300 text-sm">
                <FiMail className="mr-2" />
                <span>contact@viresta.com</span>
              </li>
              <li className="flex items-center text-secondary-300 text-sm">
                <FiMapPin className="mr-2" />
                <span>210 Visualization Way, Miami, FL</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow</h3>
            <div className="flex space-x-4">
              <Link to="/about" className="text-secondary-300 hover:text-white">
                <FiTwitter size={20} />
              </Link>
              <Link to="/about" className="text-secondary-300 hover:text-white">
                <FiLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Viresta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
