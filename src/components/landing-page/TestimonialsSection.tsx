import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-primary  text-primary " : "text-gray-500"}
          fill={i < rating ? "currentColor" : "none"}
        />
      ));
  };

  return (
    <section className="section-padding ">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-sm uppercase text-primary  tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">Client Experiences</h2>
          <div className="w-24 h-1 bg-primary  mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-black p-8 rounded-lg border border-primary /20 transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-serif text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary ">{testimonial.service}</p>
                </div>
                <div className="flex">{renderStars(testimonial.rating)}</div>
              </div>

              <p className=" italic">&quot;{testimonial.content}&quot;</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6">Join our growing list of satisfied clients</p>
          <a href="#booking" className="btn-gold">
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  );
}
