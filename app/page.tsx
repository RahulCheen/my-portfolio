import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-[family-name:var(--font-geist-sans)] pt-20">
      <main className="flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">

        {/* Hero Section */}
        <section className="text-center space-y-4 animate-fade-in-up">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 pb-2">
            Hello! I&apos;m Rahul Cheeniyil
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Neuromodulation Systems Engineer and Data Scientist
          </p>
        </section>

        {/* About Me Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-100">About Me</h2>
            <p className="text-slate-300 leading-relaxed">
              Personal blurb placeholder
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            {/* Image Placeholder */}
            <div className="w-64 h-64 bg-slate-800 rounded-2xl border-2 border-slate-700 flex items-center justify-center relative overflow-hidden shadow-2xl skew-y-0 hover:skew-y-1 transition-transform duration-500">
              <Image
                src="/images/profilePhoto.jpg"
                alt="Rahul Cheeniyil"
                width={1024}
                height={1024}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Socials Section */}
        <section className="w-full max-w-5xl text-center space-y-8 py-10">
          <h2 className="text-3xl font-bold text-slate-100">Connect With Me</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/RahulCheen" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors shadow-lg shadow-blue-900/50 flex items-center gap-2">
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/rahul-cheeniyil/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors shadow-lg shadow-blue-900/50 flex items-center gap-2">
              <span>LinkedIn</span>
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
