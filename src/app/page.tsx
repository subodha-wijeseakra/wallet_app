import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Lock, Zap, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8 animate-in slide-in-from-bottom-5 duration-500">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary w-fit">
                New: Smart Savings Goals 🚀
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none max-w-4xl">
                Financial Freedom for <span className="text-primary">Every Sri Lankan</span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Manage your rupees with confidence. Track expenses, monitor budgets, and achieve your financial dreams with Sri Lanka&apos;s most advanced wallet app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Log In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=c0aede`}
                        alt="User"
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
                <p>Trusted by 10,000+ locals</p>
              </div>

              <div className="relative w-full max-w-5xl mt-12 animate-in slide-in-from-bottom-10 duration-700 delay-200">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50">
                  <Image
                    src="/landing/hero.png"
                    alt="Sri Lankan professionals using Wallet App"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Floating UI Elements for decoration */}
                  <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-12 md:w-64 bg-background/90 backdrop-blur-md p-4 rounded-xl shadow-lg border animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Monthly Savings</div>
                      <div className="text-sm font-bold text-green-500">+24.5%</div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[70%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything you need to manage wealth
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Platform designed to help you track, save, and grow your money with ease.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  desc: "Visualize your spending patterns with beautiful, interactive charts specific to LKR currency trends."
                },
                {
                  icon: Lock,
                  title: "Bank-Grade Security",
                  desc: "Your financial data is encrypted with state-of-the-art security protocols. Safety first."
                },
                {
                  icon: Zap,
                  title: "Instant Updates",
                  desc: "Real-time sync across all your devices. Never miss a transaction or budget alert."
                }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center space-y-4 rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12">
              Loved by Locals
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Chamara Perera",
                  role: "Software Engineer, Colombo",
                  text: "Finally an app that understands how we spend in Sri Lanka. The budget tracking is a lifesaver!"
                },
                {
                  name: "Nethmi Silva",
                  role: "Entrepreneur, Kandy",
                  text: "I use Wallet to manage my business expenses. It's clean, fast, and professional. Highly recommended."
                }
              ].map((t, i) => (
                <div key={i} className="flex flex-col justify-between p-6 border rounded-xl bg-muted/30">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <p className="text-lg font-medium leading-relaxed">
                      &quot;{t.text}&quot;
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Start Your Financial Journey Today
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join thousands of Sri Lankans taking control of their future. Free to get started, no credit card required.
            </p>
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="gap-2 text-primary font-bold">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-muted/20">
        <div className="container px-4 md:px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              Wallet
            </div>
            <p className="text-muted-foreground max-w-xs">
              The #1 financial management platform tailored for the modern Sri Lankan economy.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Features</li>
              <li>Pricing</li>
              <li>Security</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="container px-4 md:px-6 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2026 Wallet App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
