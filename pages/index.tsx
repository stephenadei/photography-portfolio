import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedFilm, setSelectedFilm] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  const filteredImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.filter((img) => {
      const tags = (img.tags || []).map((t) => t.toLowerCase());
      const cameraOk = selectedCamera ? tags.includes(selectedCamera.toLowerCase()) : true;
      const filmOk = selectedFilm ? tags.includes(selectedFilm.toLowerCase()) : true;
      const themeOk = selectedTheme ? tags.includes(selectedTheme.toLowerCase()) : true;
      return cameraOk && filmOk && themeOk;
    });
  }, [images, selectedCamera, selectedFilm, selectedTheme]);

  const uniqueFromTags = (prefix: string) => {
    const set = new Set<string>();
    images.forEach((img) => (img.tags || []).forEach((t) => {
      const lower = t.toLowerCase();
      if (prefix ? lower.startsWith(prefix) : true) set.add(t);
    }));
    return Array.from(set).sort();
  };

  const cameraOptions = useMemo(() => uniqueFromTags("camera:"), [images]);
  const filmOptions = useMemo(() => uniqueFromTags("film:"), [images]);
  const themeOptions = useMemo(() => uniqueFromTags("theme:"), [images]);

  return (
    <>
      <Head>
        <title>Stephen Adei - Analog Photography Portfolio</title>
        <meta name="description" content="Professional analog photography services. Book your session today for timeless, artistic portraits and events." />
        <meta property="og:image" content="https://stephenadei-photography.vercel.app/og-image.png" />
        <meta name="twitter:image" content="https://stephenadei-photography.vercel.app/og-image.png" />
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
              <a href="#overzicht" className="text-white/80 hover:text-white transition">Overzicht</a>
              <a href="#apparatuur" className="text-white/80 hover:text-white transition">Apparatuur</a>
              <a href="#filmvoorraad" className="text-white/80 hover:text-white transition">Filmvoorraad</a>
              <a href="#contact" className="text-white/80 hover:text-white transition">Contact</a>
              <button onClick={() => setIsBookingModalOpen(true)} className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition">Boek een sessie</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1960px] p-4 pt-20">
        {photoId && (
          <Modal images={images} onClose={() => { setLastViewedPhoto(photoId as string); }} />
        )}

        <div id="portfolio" className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {/* Hero Section */}
          <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <CameraIcon className="h-32 w-32 text-white/30" />
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4">Analog Photography</h1>
              <h2 className="text-xl font-light mb-6">Tijdloze momenten, vastgelegd op film</h2>
              <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] mb-8">
                Portretten, events en creatieve projecten. Elke foto vertelt een verhaal — met de authentieke schoonheid van film.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setIsBookingModalOpen(true)} className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition">Boek een sessie</button>
                <a href="#overzicht" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">Lees meer</a>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="col-span-full w-full mb-5 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-1">Camera</label>
                <select value={selectedCamera} onChange={(e) => setSelectedCamera(e.target.value)} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white">
                  <option value="">Alle</option>
                  {cameraOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt.replace("camera:", "")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1">Film</label>
                <select value={selectedFilm} onChange={(e) => setSelectedFilm(e.target.value)} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white">
                  <option value="">Alle</option>
                  {filmOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt.replace("film:", "")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1">Thema</label>
                <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white">
                  <option value="">Alle</option>
                  {themeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt.replace("theme:", "")}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Portfolio Images */}
          {(filteredImages.length > 0 ? filteredImages : images).length > 0 ? (
            (filteredImages.length > 0 ? filteredImages : images).map(({ id, public_id, format, blurDataUrl }) => (
              <Link key={id} href={`/?photoId=${id}`} as={`/p/${id}`} ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null} shallow className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
                <Image
                  alt="Analog photography portfolio"
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="max-w-md mx-auto">
                <CameraIcon className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Geen afbeeldingen gevonden</h3>
                <p className="text-white/60 mb-6">Configureer Cloudinary en upload afbeeldingen om je portfolio te tonen.</p>
              </div>
            </div>
          )}
        </div>

        {/* Overzicht */}
        <section id="overzicht" className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Overzicht – jouw fotografieprofiel</h2>
            <div className="text-left space-y-6 text-white/80">
              <div>
                <h3 className="font-semibold text-white mb-2">Genres / Stijl</h3>
                <p>Focus op creatieve experimenten (Fun Stuffs), optimaal licht (Golden Hour) en technische scherpte (Sharpest Aperture).</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Werkwijze</h3>
                <p>Werkt met full frame én medium format analoge camera’s, met diverse filmgevoeligheden voor veelzijdige sfeer en stijl.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Archiefstructuur</h3>
                <p>Beelden en shoots worden gesorteerd op cameratype en filmtype — ideaal voor een dynamisch portfolio.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Apparatuur */}
        <section id="apparatuur" className="py-20 bg-white/5 rounded-lg">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Apparatuur</h2>
            <div className="grid md:grid-cols-2 gap-8 text-white/80">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Full Frame 35mm</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Canon A1 – handmatige bediening, creatieve controle</li>
                  <li>Olympus AF-1 Twin (Ben) – point-and-shoot met dual focal length</li>
                  <li>Ricoh FF-9 – compact, scherp, ideaal voor straatfotografie</li>
                  <li>Ricoh TF-500 – allround compactcamera</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Medium Format</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Mamiya 645 (6x4.5) – hoge resolutie, ideaal voor portretten/landschappen</li>
                  <li>Yashica D (6x6) – twin-lens reflex, klassieke look met vierkante composities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Filmvoorraad */}
        <section id="filmvoorraad" className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Filmvoorraad</h2>
            <div className="grid md:grid-cols-3 gap-8 text-white/80">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">ISO 0–200</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Kodak Ektar 100 – levendige kleuren, fijne korrel</li>
                  <li>Kodak Portra 160 – zachte huidtinten, breed bereik</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">ISO 400–600</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Kodak Portra 400 – allrounder, warm en consistent</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">ISO 800–1000</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Cinestill 800T – uniek blauw/teal tint, halation effect</li>
                  <li>Kodak Portra 800 – warme tonen, goed bij weinig licht</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Neem contact op</h2>
            <p className="text-lg text-white/80 mb-8">Klaar om samen iets moois te maken? Laten we je project bespreken.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:stephen@stephenadei.nl" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition">
                <EnvelopeIcon className="h-5 w-5" />
                stephen@stephenadei.nl
              </a>
              <a href="tel:+31612345678" className="flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
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
            <h3 className="text-2xl font-bold text-white mb-4">Boek een sessie</h3>
            <p className="text-white/80 mb-6">Vul het formulier in en ik neem binnen 24 uur contact met je op.</p>
            <form className="space-y-4">
              <input type="text" placeholder="Naam" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40" />
              <input type="email" placeholder="E-mailadres" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40" />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40">
                <option value="">Kies een dienst</option>
                <option value="portrait">Portretsessie</option>
                <option value="event">Eventfotografie</option>
                <option value="artistic">Artistiek project</option>
              </select>
              <textarea placeholder="Vertel iets over je project..." rows={4} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"></textarea>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition">Verstuur</button>
                <button type="button" onClick={() => setIsBookingModalOpen(false)} className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition">Annuleer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="p-6 text-center text-white/80 sm:p-12 border-t border-white/10">
        <p>&copy; 2024 Stephen Adei Photography. Alle rechten voorbehouden.</p>
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    if (!process.env.CLOUDINARY_FOLDER) {
      return { props: { images: [] } };
    }

    const results = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by("public_id", "desc")
      .with_field("tags")
      .with_field("context")
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
        tags: result.tags || [],
        context: result.context || {},
      });
      i++;
    }

    const blurImagePromises = results.resources.map((image: ImageProps) => getBase64ImageUrl(image));
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);
    for (let i = 0; i < reducedResults.length; i++) {
      reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
    }

    return { props: { images: reducedResults } };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { props: { images: [] } };
  }
}
