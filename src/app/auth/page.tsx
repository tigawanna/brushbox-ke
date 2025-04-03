import { OauthButton } from "./__components/OauthButton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ResponsiveGenericToolbar } from "@/components/shared/nav/ResponsiveGenericToolbar";

export default function SignInPage() {
  return (
    <ResponsiveGenericToolbar>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-base-100 relative overflow-hidden">
        {/* Background pattern */}
        <div
          className={cn(
            "absolute inset-0 opacity-20",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />

        {/* Left side - decorative */}
        <div className="relative md:w-1/2 flex items-center justify-center p-8 z-10">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <Image
              src="/belle.png"
              alt="Brushbox Beauty"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Right side - login form */}
        <div className="relative md:w-1/2 flex items-center justify-center p-8 z-10">
          <div className="max-w-md w-full space-y-8 p-8  backdrop-blur-sm rounded-xl shadow-xl border border-primary/10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-base-content">Welcome Back</h2>
              <p className="mt-2 text-sm text-base-content/70">
                Sign in to manage your appointments
              </p>
            </div>

            <div>
              <OauthButton />
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-base-content/50">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-bl-full z-0" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-tr-full z-0" />
      </div>
    </ResponsiveGenericToolbar>
  );
}
