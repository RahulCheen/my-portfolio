import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
    if (slug !== 'mnist-digit-classification') return null;

    // Using raw GitHub URL for the markdown content
    const url = 'https://raw.githubusercontent.com/RahulCheen/MNIST-Digit-Classification/main/README.md';
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
        if (!res.ok) {
            console.error('Failed to fetch README:', res.statusText);
            return "Failed to load README from GitHub.";
        }
        return res.text();
    } catch (error) {
        console.error('Error fetching README:', error);
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

    const isMNIST = slug === 'mnist-digit-classification';
    const readmeContent = await getReadme(slug);

    return (
        <div className="min-h-screen bg-slate-900 font-[family-name:var(--font-geist-sans)] pt-24 px-8 pb-20">
            <main className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-slate-100 uppercase tracking-wide">{slug.replace(/-/g, ' ')}</h1>

                {isMNIST && <YouTubeEmbed videoId="CviLPTFX5fI" />}

                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                    {isMNIST && readmeContent ? (
                        <article className="prose prose-invert prose-lg max-w-none prose-blue prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-img:rounded-xl prose-img:shadow-lg">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}
                                components={{
                                    a: ({ node, ...props}) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer" />
                                    ),
                                }}
                            >
                                {readmeContent}
                            </ReactMarkdown>
                        </article>
                    ) : (
                        <>
                            <p className="text-slate-300">
                                This is a placeholder page for project <strong>{slug}</strong>.
                            </p>
                            <p className="text-slate-400 mt-4">
                                Content for this project would go here.
                            </p>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
