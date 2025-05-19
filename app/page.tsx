import Link from "next/link";
import { Dumbbell, Users, Calendar, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen text-foreground">
      <div className="fixed inset-0 -z-10 h-full w-full bg-[url('/noise3.png')] opacity-30 pointer-events-none bg-repeat" />
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a0d0d] to-[#0a0a0a]" />
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center space-y-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Realsteel
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Transform your body, elevate your mind, and reach your fitness goals
            with us.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/signin">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose FitHub?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              { icon: Dumbbell, title: "State-of-the-art Equipment" },
              { icon: Users, title: "Expert Trainers" },
              { icon: Calendar, title: "Flexible Class Schedule" },
              { icon: Trophy, title: "Proven Results" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24  text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Join FitHub today and take the first step towards a healthier,
            stronger you.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signin">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John D.",
                quote:
                  "FitHub transformed my life. I've never felt stronger or more confident.",
              },
              {
                name: "Sarah M.",
                quote:
                  "The trainers here are amazing. They push you to be your best self.",
              },
              {
                name: "Mike R.",
                quote:
                  "Great community, awesome classes. FitHub is more than just a gym.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-muted p-6 rounded-lg shadow-sm">
                <p className="italic mb-4 text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-semibold text-foreground">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
