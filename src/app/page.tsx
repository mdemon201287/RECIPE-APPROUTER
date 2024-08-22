import Image from 'next/image';
import ClientPage from '@/app/ClientPage';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <div className="relative z-10">
        <ClientPage />

        {/* Bottom Images */}
        <div className="relative mt-32 p-4 z-10">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="w-full md:w-1/4 h-48 relative">
              <Image
                src="/images/background1.jpg"
                alt="Bottom Image 1"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/4 h-48 relative">
              <Image
                src="/images/background2.jpg"
                alt="Bottom Image 2"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/4 h-48 relative">
              <Image
                src="/images/background3.jpg"
                alt="Bottom Image 3"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
