import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black w-full py-16">
      <div className="max-w-7xl mx-auto pl-0 pr-8">
        <div className="flex">
          {/* Logo and tagline column */}
          <div className="w-1/4">
            <div className="w-[17.77775rem] h-[10rem] relative flex-shrink-0" style={{ aspectRatio: '284.44/160.00' }}>
              <Image 
                src="/Bough Logo.svg"
                alt="Bough Consulting Logo"
                fill
                className="object-contain filter invert object-left"
              />
            </div>
            <div className="mt-6">
              <p className="text-white text-[1.125rem] font-normal leading-[1.75rem]" style={{ fontFamily: 'SF Pro, sans-serif' }}>
                Embracing change,<br />
                elevating performance
              </p>
            </div>
          </div>

          {/* Menu columns container - adjust spacing to push further right */}
          <div className="w-3/4 flex justify-end space-x-14">
            <div>
              <h3 className="text-white font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/services/accounting" className="text-white hover:text-gray-300 block">Accounting</Link></li>
                <li><Link href="/services/risk" className="text-white hover:text-gray-300 block">Risk</Link></li>
                <li><Link href="/services/transformation" className="text-white hover:text-gray-300 block">Transformation</Link></li>
                <li><Link href="/services/esg" className="text-white hover:text-gray-300 block">ESG</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Insights</h3>
              <ul className="space-y-3">
                <li><Link href="/insights/case-studies" className="text-white hover:text-gray-300 block">Case studies</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Careers</h3>
              <ul className="space-y-3">
                <li><Link href="/careers/the-bough-way" className="text-white hover:text-gray-300 block">The Bough way</Link></li>
                <li><Link href="/careers/hiring-process" className="text-white hover:text-gray-300 block">Hiring process</Link></li>
                <li><Link href="/careers/transformation" className="text-white hover:text-gray-300 block">Transformation</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">About us</h3>
              <ul className="space-y-3">
                <li><Link href="/about/who-we-are" className="text-white hover:text-gray-300 block">Who we are</Link></li>
                <li><Link href="/about/meet-the-team" className="text-white hover:text-gray-300 block">Meet the team</Link></li>
                <li><Link href="/about/our-values" className="text-white hover:text-gray-300 block">Our values</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Locations</h3>
              <ul className="space-y-3">
                <li><Link href="/locations/united-states" className="text-white hover:text-gray-300 block">United States</Link></li>
                <li><Link href="/locations/gurugram" className="text-white hover:text-gray-300 block">Gurugram</Link></li>
                <li><Link href="/locations/delhi" className="text-white hover:text-gray-300 block">Delhi</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-16 flex justify-between items-center">
          <p className="text-white text-sm">
            Copyright ©2024, Bough Consulting, LLC. All rights reserved
          </p>
          <div>
            <Link href="https://www.linkedin.com" aria-label="LinkedIn">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                className="text-white fill-current"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 