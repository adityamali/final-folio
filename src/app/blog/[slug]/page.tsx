import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

// Revalidate every hour
export const revalidate = 3600;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { data: post } = await supabase
        .from('posts')
        .select('title, excerpt')
        .eq('slug', slug)
        .single();

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Aditya Mali`,
        description: post.excerpt,
    };
}

async function getPost(slug: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        return null;
    }

    return data as BlogPost;
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto px-6 py-20">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Blog
            </Link>

            <header className="mb-10">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                        <>
                            <span>•</span>
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
                {/* 
          In a real app, you'd use a markdown renderer here. 
          For now, assuming content is plain text or HTML. 
          If markdown, use react-markdown or similar.
        */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    );
}
