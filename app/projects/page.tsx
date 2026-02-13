import Link from 'next/link';

export default function Projects() {
    const projects = [
        { id: 'mnist-digit-classification', title: 'MNIST Digit Classification', description: 'Comparison of CNN architectures on digit classification.', tags: ['Python', 'PyTorch', 'Deep Learning', 'CNN', 'Computer Vision'] },
        { id: 'sudoku', title: 'Sudoku', description: 'A Sudoku game with a custom generator and solver.', tags: ['TypeScript', 'React', 'Suffering', 'Algorithms'] },
        { id: 'raspberry-pi-gemini-voice-assistant', title: 'Raspberry Pi Assistant', description: 'A custom voice agent leveraging the Google Gemini API.', tags: ['Python', 'Raspberry Pi', 'Gemini', 'NLP', 'Automation'] },
        { id: 'snake', title: 'Snake', description: 'An OOP practicum recreating everyone\'s first videogame.', tags: ['Python', 'OOP', 'Game design'] },
    ];

    return (
        <div className="min-h-screen bg-slate-900 font-[family-name:var(--font-geist-sans)] pt-24 px-8 pb-20">
            <main className="max-w-5xl mx-auto space-y-12">
                <section className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-slate-100">My Projects</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        A collection of my recent work and experiments.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link href={`/projects/${project.id}`} key={project.id} className="group block p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors shadow-lg hover:shadow-blue-900/20">
                            <h2 className="text-2xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors mb-2">{project.title}</h2>
                            <p className="text-slate-400 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md">{tag}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}
