import { GithubIcon } from '@/app/components/icons/GithubIcon';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';
import MarkdownView from '@/app/components/features/MarkdownView';

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const PROJECT_REGISTRY: Record<string, {repo: string; user: string; videoId?: string}> = {
    'mnist-digit-classification': {
        user: 'RahulCheen',
        repo: 'MNIST-Digit-Classification',
        videoId: 'CviLPTFX5fI',
    },
    'raspberry-pi-gemini-voice-assistant': {
        user: 'RahulCheen',
        repo: 'RasPi-Gemini-Assistant',
    }
};

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    return (
        <div className="aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-2xl my-8">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

async function getReadme(slug: string) {
    const project = PROJECT_REGISTRY[slug];
    if (!project) return null;

    const url = `https://raw.githubusercontent.com/${project.user}/${project.repo}/main/README.md`;
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return "Failed to load README from GitHub.";
        return res.text();
    } catch (error) {
        return "Error loading README.";
    }
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Project: ${slug.replace(/-/g, ' ')}`,
    }
}

export default async function ProjectDetail({ params }: Props) {
    const { slug } = await params;
    const projectData = PROJECT_REGISTRY[slug];
    const readmeContent = await getReadme(slug);
    
    if (!projectData) {
        return <div>Project not found</div>;
    }
    
    return (
        <div className="min-h-screen bg-slate-900 font-[family-name:var(--font-geist-sans)] pt-24 px-8 pb-20">
            <main className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-slate-100 uppercase tracking-wide">{slug.replace(/-/g, ' ')}</h1>

                <a 
                    href={`https://github.com/${projectData.user}/${projectData.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-all"
                >
                    <GithubIcon className="w-5 h-5 text-slate-300" />
                    View Source Code on GitHub
                </a>

                {projectData.videoId && <YouTubeEmbed videoId={projectData.videoId} />}

                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                    {readmeContent ? (
                        <MarkdownView content={readmeContent} />
                    ) : (
                        <p className="text-slate-400 text-center">Loading project details...</p>
                    )}
                </div>
            </main>
        </div>
    );
}
