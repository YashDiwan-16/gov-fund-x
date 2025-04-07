import Link from "next/link";
import Image from "next/image";
import { text } from "@/data/en";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShieldCheck, Zap, BarChart3, Lock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen px-4 dark:bg-slate-950">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10 dark:opacity-20"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px] dark:bg-grid-slate/[0.05]"></div>
        
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-4">
                  <span className="font-medium">Blockchain Powered</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-200 max-w-xl">
                  {text.home.hero.title}
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                  {text.home.hero.subtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="group dark:bg-gray-100 hover:bg-gov-700 bg-gray-800 dark:hover:bg-gov-600">
                  <Link href="/auth">
                    {text.home.hero.cta}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="dark:border-slate-700">
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1 text-green-500 dark:text-green-400" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-1 text-amber-500 dark:text-amber-400" />
                  <span>Transparent</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-blue-500 dark:text-blue-400" />
                  <span>Efficient</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gov-600 to-gov-400 rounded-lg blur opacity-30 animate-pulse dark:from-gov-500 dark:to-gov-300"></div>
              <div className="relative bg-background border rounded-lg shadow-xl overflow-hidden dark:border-slate-800">
                <div className="h-8 bg-muted border-b flex items-center space-x-1.5 px-4 dark:border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6">
                  <Image
                    src="/placeholder.svg" 
                    alt="GovFund Platform Dashboard"
                    width={600}
                    height={400}
                    className="rounded-md border shadow-sm dark:border-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900">
        <div className=" ">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{text.home.features.title}</h2>
            <p className="text-muted-foreground">
              Our blockchain-based platform ensures transparency, security and efficiency in government fund allocation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border card-hover dark:border-slate-700">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{text.home.features.transparency.title}</h3>
              <p className="text-muted-foreground">
                {text.home.features.transparency.description}
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border card-hover dark:border-slate-700">
              <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{text.home.features.security.title}</h3>
              <p className="text-muted-foreground">
                {text.home.features.security.description}
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border card-hover dark:border-slate-700">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{text.home.features.efficiency.title}</h3>
              <p className="text-muted-foreground">
                {text.home.features.efficiency.description}
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border card-hover dark:border-slate-700">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{text.home.features.accountability.title}</h3>
              <p className="text-muted-foreground">
                {text.home.features.accountability.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className=" ">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{text.home.howItWorks.title}</h2>
            <p className="text-muted-foreground">
              Our blockchain platform simplifies and secures the entire process from project creation to fund disbursement.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gov-200 dark:bg-gov-800/50 hidden md:block"></div>
            
            {text.home.howItWorks.steps.map((step, index) => (
              <div key={index} className="relative mb-12 last:mb-0">
                <div className={`flex flex-col md:flex-row md:items-center gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gov-600 text-white font-bold text-sm z-10 dark:bg-gov-500">
                        {index + 1}
                      </span>
                      <div className="h-0.5 flex-1 bg-gov-200 dark:bg-gov-800/50 ml-4 hidden md:block"></div>
                    </div>
                    <h3 className="text-xl font-semibold dark:text-white">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className="w-full md:w-1/2 relative">
                    <div className="rounded-lg overflow-hidden border shadow-sm dark:border-slate-800">
                      <Image
                        src="/placeholder.svg"
                        alt={step.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      {/* <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900">
        <div className=" ">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{text.home.testimonials.title}</h2>
            <p className="text-muted-foreground">
              Hear from government authorities, contractors, and auditors who are using our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {text.home.testimonials.items.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border card-hover dark:border-slate-700">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 dark:text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium dark:text-white">
                      {testimonial.author.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className=" ">
          <div className="bg-gradient-to-r from-gov-700 to-gov-600 dark:from-gov-600 dark:to-gov-500 rounded-2xl px-8 py-12 md:py-16 md:px-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
                {text.home.cta.title}
              </h2>
              <p className="text-black/80  dark:text-white/90 text-lg mb-8">
                {text.home.cta.description}
              </p>
              <Button size="lg" variant="outline" asChild className="bg-gray-200 hover:bg-gray-100 text-gov-700 hover:text-gov-800 border-white dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:border-slate-700 ">
                <Link href="/auth">
                  {text.home.cta.button}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}