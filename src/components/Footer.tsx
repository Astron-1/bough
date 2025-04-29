import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date();
  return (
    <footer className="bg-black w-full py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-14">
          {/* Logo and tagline */}
          <div className="mb-10 lg:mb-0 lg:w-1/4">
            <div
              className="w-60 h-auto relative"
              style={{ aspectRatio: "284.44 / 160.00" }}
            >
              <Image
                src="/boughWhite.svg"
                alt="Bough Consulting Logo"
                width={400}
                height={400}
                className="object-contain object-left"
              />
            </div>
            <p
              className="mt-6 text-base leading-7"
              style={{ fontFamily: "SF Pro, sans-serif" }}
            >
              Embracing change,
              <br />
              elevating performance
            </p>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:w-3/4">
            {/* Column 1 */}
            <div>
              <h3 className="font-semibold mb-4 text-[#53FBFB]">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/Accounting"
                    className="hover:text-gray-300 block"
                  >
                    Accounting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/Risk"
                    className="hover:text-gray-300 block"
                  >
                    Risk
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/Transformation"
                    className="hover:text-gray-300 block"
                  >
                    Transformation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/ESG"
                    className="hover:text-gray-300 block"
                  >
                    ESG
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-semibold mb-4 text-[#53FBFB]">Insights</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/insights/case-studies"
                    className="hover:text-gray-300 block"
                  >
                    Case studies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-semibold mb-4 text-[#53FBFB]">Careers</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/careers/the-bough-way"
                    className="hover:text-gray-300 block"
                  >
                    The Bough way
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers/hiring-process"
                    className="hover:text-gray-300 block"
                  >
                    Hiring process
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers/transformation"
                    className="hover:text-gray-300 block"
                  >
                    Transformation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-semibold mb-4 text-[#53FBFB]">About us</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about/who-we-are"
                    className="hover:text-gray-300 block"
                  >
                    Who we are
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/meet-the-team"
                    className="hover:text-gray-300 block"
                  >
                    Meet the team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/our-values"
                    className="hover:text-gray-300 block"
                  >
                    Our values
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h3 className="font-semibold mb-4 text-[#53FBFB]">Locations</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/locations/united-states"
                    className="hover:text-gray-300 block"
                  >
                    United States
                  </Link>
                </li>
                <li>
                  <Link
                    href="/locations/gurugram"
                    className="hover:text-gray-300 block"
                  >
                    Gurugram
                  </Link>
                </li>
                <li>
                  <Link
                    href="/locations/delhi"
                    className="hover:text-gray-300 block"
                  >
                    Delhi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left mb-4 sm:mb-0">
            © {year.getFullYear()}, Bough Consulting, LLC. All rights reserved.
          </p>
          <div>
            <Link href="https://www.linkedin.com" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current hover:text-gray-300"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
