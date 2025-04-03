import { gallery } from "@/data/gallery";
import Image from "next/image";


export function GallerySection(){
return (
  <section id="gallery" className="section-padding ">
    <div className="container-custom">
      <div className="text-center mb-16">
        <span className="text-sm uppercase text-primary  tracking-widest">Gallery</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">Our Masterpieces</h2>
        <p className="mt-4  max-w-2xl mx-auto">
          Browse through a selection of our finest work and get inspired for your next beauty
          transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((image, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
            <Image
                width={800}
                height={800}
              src={image.url}
              alt={image.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
              <span className=" font-serif text-xl">{image.caption}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className=" mb-4">Follow us on Instagram for more inspiration</p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary  hover:underline">
          @glamourgold_salon
          <span className="ml-2">→</span>
        </a>
      </div>
    </div>
  </section>
);
}
