import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CameraIcon, CalendarIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>Stephen Adei - Analog Photography Portfolio</title>
        <meta name="description" content="Professional analog photography services. Book your session today for timeless, artistic portraits and events." />
        <meta
          property="og:image"
          content="https://stephenadei-photography.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://stephenadei-photography.vercel.app/og-image.png"
        />
      </Head>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CameraIcon className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">Stephen Adei</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#portfolio" className="text-white/80 hover:text-white transition">Portfolio</a>
              <a href="#about" className="text-white/80 hover:text-white transition">About</a>
              <a href="#services" className="text-white/80 hover:text-white transition">Services</a>
              <a href="#contact" className="text-white/80 hover:text-white transition">Contact</a>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1960px] p-4 pt-20">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {/* Hero Section */}
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <CameraIcon className="h-32 w-32 text-white/30" />
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4">Analog Photography</h1>
              <h2 className="text-xl font-light mb-6">Capturing Timeless Moments</h2>
              <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] mb-8">
                Professional analog photography services for portraits, events, and artistic projects. 
                Each image tells a story through the authentic beauty of film.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
                >
                  Book Your Session
                </button>
                <a
                  href="#portfolio"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
          
          {/* Portfolio Images */}
          {images.length > 0 ? (
            images.map(({ id, public_id, format, blurDataUrl }) => (
              <Link
                key={id}
                href={`/?photoId=${id}`}
                as={`/p/${id}`}
                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              >
                <Image
                  alt="Analog photography portfolio"
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw"
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="max-w-md mx-auto">
                <CameraIcon className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Images Found</h3>
                <p className="text-white/60 mb-6">
                  Please configure your Cloudinary settings and upload some images to see your portfolio.
                </p>
                <div className="bg-white/10 rounded-lg p-4 text-left">
                  <p className="text-sm text-white/80 mb-2">To get started:</p>
                  <ol className="text-sm text-white/60 space-y-1">
                    <li>1. Create a Cloudinary account</li>
                    <li>2. Create a folder for your images</li>
                    <li>3. Upload your photography</li>
                    <li>4. Update your environment variables</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">About My Work</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              I specialize in analog photography, using traditional film cameras to create authentic, 
              timeless images. Each photograph is carefully composed and developed by hand, ensuring 
              the highest quality and artistic integrity. From intimate portraits to grand events, 
              I capture the essence of every moment through the unique character of film.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white/5 rounded-lg">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-white/10">
                <CameraIcon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Portrait Sessions</h3>
                <p className="text-white/80">Professional portraits that capture your true essence using classic analog techniques.</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-white/10">
                <CalendarIcon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Event Photography</h3>
                <p className="text-white/80">Weddings, parties, and special events documented with artistic flair and attention to detail.</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-white/10">
                <EnvelopeIcon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Artistic Projects</h3>
                <p className="text-white/80">Collaborative artistic projects and creative photography for brands and individuals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
            <p className="text-lg text-white/80 mb-8">
              Ready to create something beautiful together? Let's discuss your photography needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:stephen@stephenadei.nl"
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
              >
                <EnvelopeIcon className="h-5 w-5" />
                stephen@stephenadei.nl
              </a>
              <a
                href="tel:+31612345678"
                className="flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
              >
                <PhoneIcon className="h-5 w-5" />
                +31 6 1234 5678
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-2xl" onClick={() => setIsBookingModalOpen(false)}></div>
          <div className="relative bg-gray-900 rounded-lg p-8 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Book Your Session</h3>
            <p className="text-white/80 mb-6">
              Let's create something beautiful together. Fill out the form below and I'll get back to you within 24 hours.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40">
                <option value="">Select Service</option>
                <option value="portrait">Portrait Session</option>
                <option value="event">Event Photography</option>
                <option value="artistic">Artistic Project</option>
              </select>
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              ></textarea>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="p-6 text-center text-white/80 sm:p-12 border-t border-white/10">
        <p>&copy; 2024 Stephen Adei Photography. All rights reserved.</p>
        <p className="mt-2">Capturing life's beautiful moments through the art of analog photography.</p>
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_FOLDER) {
      console.warn('CLOUDINARY_FOLDER not configured, returning empty images array');
      return {
        props: {
          images: [],
        },
      };
    }

    const results = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by("public_id", "desc")
      .max_results(400)
      .execute();
    let reducedResults: ImageProps[] = [];

    let i = 0;
    for (let result of results.resources) {
      reducedResults.push({
        id: i,
        height: result.height,
        width: result.width,
        public_id: result.public_id,
        format: result.format,
      });
      i++;
    }

    const blurImagePromises = results.resources.map((image: ImageProps) => {
      return getBase64ImageUrl(image);
    });
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

    for (let i = 0; i < reducedResults.length; i++) {
      reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
    }

    return {
      props: {
        images: reducedResults,
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        images: [],
      },
    };
  }
}
