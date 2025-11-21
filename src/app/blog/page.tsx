import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Aditya Mali',
    description: 'Thoughts, tutorials, and insights on web development and design.',
};

// Revalidate immediately for now
export const revalidate = 0;

async function getPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    console.log('Fetched posts:', data);
    return data as BlogPost[];
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <header className="mb-16">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
                <p className="text-xl text-muted-foreground">
                    Thoughts, tutorials, and insights on web development.
                </p>
            </header>

            <div className="grid gap-10">
                {posts.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-border rounded-xl">
                        <p className="text-muted-foreground">No posts found yet. Check back soon!</p>
                        <Link href="/" className="text-primary mt-4 inline-block">Go back home</Link>
                    </div>
                ) : (
                    posts.map((post) => (
                        <article key={post.id} className="group relative flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
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

                            <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                <Link href={`/blog/${post.slug}`}>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </Link>
                            </h2>

                            {post.excerpt && (
                                <p className="text-muted-foreground leading-relaxed">
                                    {post.excerpt}
                                </p>
                            )}

                            <div className="text-sm font-medium text-primary mt-2 group-hover:translate-x-1 transition-transform inline-flex items-center">
                                Read more →
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}
