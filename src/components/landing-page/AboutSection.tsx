import Image from "next/image";


export function AboutSection(){
return (
    <section id="about" className="section-padding bg-black relative">
      {/* Gold accent elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary /5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-primary /5 blur-3xl"></div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-sm uppercase text-primary  tracking-widest">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Nairobi&apos;s Premium Beauty Destination</h2>
            
            <p className="text-white/80 mb-4">
              Welcome to Glamour Gold Salon, where beauty meets luxury in the heart of Nairobi. 
              Our team of skilled professionals is dedicated to enhancing your natural beauty 
              through expert hair styling, nail care, and body treatments.
            </p>
            
            <p className="text-white/80 mb-6">
              Founded on the principles of excellence and personalized care, we take pride in 
              offering a comprehensive range of services in a relaxing and elegant environment. 
              Each client receives our undivided attention and customized treatments tailored 
              to their unique needs and preferences.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#111] p-4 rounded-lg border border-primary /10">
                <h4 className="font-serif text-2xl font-semibold text-primary  mb-1">5+</h4>
                <p className="text-sm text-white/70">Years of Excellence</p>
              </div>
              <div className="bg-[#111] p-4 rounded-lg border border-primary /10">
                <h4 className="font-serif text-2xl font-semibold text-primary  mb-1">1000+</h4>
                <p className="text-sm text-white/70">Happy Clients</p>
              </div>
              <div className="bg-[#111] p-4 rounded-lg border border-primary /10">
                <h4 className="font-serif text-2xl font-semibold text-primary  mb-1">15+</h4>
                <p className="text-sm text-white/70">Expert Stylists</p>
              </div>
              <div className="bg-[#111] p-4 rounded-lg border border-primary /10">
                <h4 className="font-serif text-2xl font-semibold text-primary  mb-1">100%</h4>
                <p className="text-sm text-white/70">Satisfaction</p>
              </div>
            </div>
            
            <a href="#booking" className="btn-gold inline-block">
              Book Your Experience
            </a>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 border border-primary  transform -rotate-3 rounded-lg"></div>
            <div className="absolute inset-0 border border-primary  transform rotate-3 rounded-lg"></div>
            <Image
              width={800}
              height={800}
              src="https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=1000&auto=format&fit=crop"
              alt="Salon interior" 
              className="rounded-lg w-full h-[500px] object-cover relative z-10"
            />
            
            <div className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 bg-black border border-primary  p-6 rounded-lg shadow-xl z-20">
              <p className="font-serif italic text-primary ">
                &quot;Beauty begins the moment you decide to be yourself.&quot;
              </p>
              <p className="text-right text-sm mt-2 text-white/70">- Coco Chanel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
);
}
