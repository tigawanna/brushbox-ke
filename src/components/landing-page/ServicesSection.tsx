"use client";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";


export function ServicesSection(){
return (
  <section
    id="services"
    className="section-padding relative  w-full py-12 flex flex-col justify-center items-center bg-base-100/50">
    {/* Gold accent line */}
    <div className="absolute top-0 left-0 right-0 h-px gold-gradient"></div>

    <div className="container-custom w-full  flex flex-col max-w-[90%]">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}>
        <span className="text-sm uppercase text-primary tracking-widest">Our Expertise</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">Luxury Beauty Services</h2>
        <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2 justify-center items-center w-full">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1, // Staggered delay based on index
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
            className={cn(
              "relative overflow-hidden",
              "border border-base-300 hover:border-base-200 group",
              "bg-gradient-to-br from-base-100/10 via-neutral/10 to-base-300/10 backdrop-blur-sm",
              "rounded-lg p-8 bg-base-300",
              "shadow-xl",
              "hover:shadow-xl",
              "transition-all duration-300 ease-in-out"
            )}>
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-700"></div>

            {/* Content */}
            <div className="relative z-10 ">
              <motion.div
                className="mb-6 text-4xl text-primary/80 group-hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "rotate", stiffness: 400, damping: 10 }}>
                {service.icon}
              </motion.div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              <p className="mb-6 font-sans text-base-content/80 group-hover:text-base-content/90 transition-colors duration-300">
                {service.description}
              </p>

              <ul className="space-y-2 ">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    viewport={{ once: true }}>
                    <span className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300"></span>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8">
                <motion.a
                  href="#booking"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 group-hover:gap-2 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  Book Service
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
}
