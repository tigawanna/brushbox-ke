import { cn } from "@/lib/utils";
import { Icons } from "../icons/icons";
import Image from "next/image";
import { BookAppointment } from "../nav/CurrentUser";



export function HeroSection(){
return (
  <section className="flex min-h-screen  flex-col w-full items-center">
    <div
      className={cn(
        "absolute inset-0",
        "[background-size:20px_20px]",
        "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
      )}
    />
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center h-full">
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-8">
        <div className="text-center md:text-left flex flex-col gap-4">
          <h1 className="text-primary text-6xl  md:hidden font-serif">Brushbox</h1>

          <div className="h-0.5 w-32 mx-auto bg-accent md:hidden" />

          <h1 className="text-primary text-2xl max-w-xl lg:text-7xl font-bold mb-4 leading-tight">
            Discover Your True Beauty
          </h1>

          <div className="flex justify-center md:justify-start">
            <BookAppointment />
          </div>
        </div>

        <div className="">
          <Image
            src="/belle.png"
            alt="logo"
            width={600}
            height={600}
            className="w-64 h-64 md:w-96 md:h-96 lg:w-[600px] lg:h-[600px] object-contain"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);
}
