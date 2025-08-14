import {
      FaFacebookF,
      FaInstagram,
      FaLinkedinIn,
      FaTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
      return (
            <footer className="bg-[#333] text-white py-10">
                  <div className="max-w-[1200px] mx-auto px-5">
                        {/* Responsive grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                              {/* Company */}
                              <div>
                                    <h4 className="text-lg uppercase text-gray-100 mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:bg-red-500 after:h-[2px] after:w-[50px]">
                                          Company
                                    </h4>
                                    <ul className="list-none p-0">
                                          <li className="mb-2">
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      About Us
                                                </Link>
                                          </li>
                                          <li className="mb-2">
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      Our Services
                                                </Link>
                                          </li>
                                          <li className="mb-2">
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      Privacy Policy
                                                </Link>
                                          </li>
                                          <li>
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      Affiliate Program
                                                </Link>
                                          </li>
                                    </ul>
                              </div>

                              {/* Get Help */}
                              <div>
                                    <h4 className="text-lg uppercase text-gray-100 mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:bg-red-500 after:h-[2px] after:w-[50px]">
                                          Get Help
                                    </h4>
                                    <ul className="list-none p-0">
                                          <li className="mb-2">
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      FAQ
                                                </Link>
                                          </li>
                                          <li className="mb-2">
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      Shipping
                                                </Link>
                                          </li>
                                          <li className="mb-2">
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      Returns
                                                </Link>
                                          </li>
                                          <li className="mb-2">
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      Order Status
                                                </Link>
                                          </li>
                                          <li>
                                                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                                                      Payment Options
                                                </Link>
                                          </li>
                                    </ul>
                              </div>

                              {/* Online Shop */}
                              <div>
                                    <h4 className="text-lg uppercase text-gray-100 mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:bg-red-500 after:h-[2px] after:w-[50px]">
                                          Online Shop
                                    </h4>
                                    <ul className="list-none p-0">
                                          {["Watch", "Bag", "Shoes", "Dress"].map((item) => (
                                                <li
                                                      key={item}
                                                      className="mb-2 cursor-pointer flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                                                >
                                                      <Link className="text-gray-400 cursor-pointer hover:text-white" to={`/search?category=${item.toLowerCase()}`}>{item}</Link>
                                                </li>
                                          ))}
                                    </ul>
                              </div>

                              {/* Follow Us */}
                              <div>
                                    <h4 className="text-lg uppercase text-gray-100 mb-5 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:bg-red-500 after:h-[2px] after:w-[50px]">
                                          Follow Us
                                    </h4>
                                    <div className="flex gap-3">
                                          <a
                                                href="#"
                                                className="h-10 w-10 bg-[#404040] flex items-center justify-center rounded-full hover:bg-red-500 transition-colors"
                                          >
                                                <FaFacebookF className="text-white text-lg" />
                                          </a>
                                          <a
                                                href="#"
                                                className="h-10 w-10 bg-[#404040] flex items-center justify-center rounded-full hover:bg-red-500 transition-colors"
                                          >
                                                <FaTwitter className="text-white text-lg" />
                                          </a>
                                          <a
                                                href="#"
                                                className="h-10 w-10 bg-[#404040] flex items-center justify-center rounded-full hover:bg-red-500 transition-colors"
                                          >
                                                <FaInstagram className="text-white text-lg" />
                                          </a>
                                          <a
                                                href="#"
                                                className="h-10 w-10 bg-[#404040] flex items-center justify-center rounded-full hover:bg-red-500 transition-colors"
                                          >
                                                <FaLinkedinIn className="text-white text-lg" />
                                          </a>
                                    </div>
                              </div>
                        </div>
                  </div>
            </footer>
      );
};

export default Footer;
