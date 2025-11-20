export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    published: boolean;
    created_at: string;
    updated_at: string;
    tags?: string[];
    cover_image?: string;
}
