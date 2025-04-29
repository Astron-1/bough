import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './ui/Button';
import ShinyText from './ui/ShinyText';

interface ConnectCTAProps {
  className?: string;
}

const ConnectCTA: React.FC<ConnectCTAProps> = ({ className = "" }) => {
  return (
    <section className={`relative w-full overflow-hidden py-20 ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/bg-wave-img-for-above-footer.jpg"
          alt="Blue wave background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Let&apos;s drive outcomes by crafting changes
        </h2>
        <p className="text-white text-2xl md:text-3xl mb-8 font-light">
          for a meaningful tomorrow, now
        </p>
        
        {/* Connect Button */}
        <div className="flex justify-center mt-8">
          <Link href="/connect">
            <Button className="bg-[#1143E8] hover:bg-[#0035d9] border border-white/30 px-10 py-3">
              <ShinyText text="Connect" speed={3} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConnectCTA; 