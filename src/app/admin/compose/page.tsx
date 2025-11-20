'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
    Bold, Italic, Heading, Link as LinkIcon, Image as ImageIcon,
    Code, List, Quote, Save, ArrowLeft, Settings, Eye, Edit2, Upload, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ComposePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showSettings, setShowSettings] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        tags: '',
        cover_image: '',
        published: true // Default to true so posts show up immediately
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title)
        }));
    };

    const insertMarkdown = (prefix: string, suffix: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);

        setFormData(prev => ({ ...prev, content: newText }));

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    const handleImageUpload = async (file: File): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const url = await handleImageUpload(file);
        if (url) {
            setFormData(prev => ({ ...prev, cover_image: url }));
        }
    };

    const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const url = await handleImageUpload(file);
        if (url) {
            insertMarkdown(`![${file.name}](${url})`);
        }
        // Reset input
        e.target.value = '';
    };

    const triggerImageUpload = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

        const { error } = await supabase.from('posts').insert({
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            tags: tagsArray,
            cover_image: formData.cover_image,
            published: formData.published
        });

        setLoading(false);

        if (error) {
            alert('Error creating post: ' + error.message);
        } else {
            alert('Post created successfully!');
            router.push('/blog');
        }
    };

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            {/* Hidden file input for editor images */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleEditorImageUpload}
            />

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col h-full relative transition-all duration-300">
                {/* Top Bar */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-4">
                        <Link href="/blog" className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
                            <ArrowLeft size={20} />
                        </Link>
                        <span className="text-sm font-medium text-muted-foreground">
                            {formData.published ? 'Published' : 'Draft'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPreviewMode(!previewMode)}
                            className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                            title={previewMode ? "Edit" : "Preview"}
                        >
                            {previewMode ? <Edit2 size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={cn(
                                "p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors",
                                showSettings && "bg-muted text-foreground"
                            )}
                            title="Settings"
                        >
                            <Settings size={18} />
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 ml-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </header>

                {/* Editor Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl mx-auto px-8 py-12">
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Post Title"
                            className="w-full bg-transparent text-4xl md:text-5xl font-bold placeholder:text-muted-foreground/30 outline-none mb-8"
                        />

                        {previewMode ? (
                            <div className="prose prose-invert max-w-none">
                                {/* Basic preview - in a real app, use a markdown parser here */}
                                <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-muted-foreground">
                                    {formData.content || <span className="italic text-muted-foreground/50">Nothing to preview yet...</span>}
                                </div>
                            </div>
                        ) : (
                            <div className="relative group">
                                {/* Floating Toolbar */}
                                <div className="sticky top-0 mb-4 flex items-center gap-1 p-1 rounded-lg border border-border bg-card/80 backdrop-blur-sm w-fit shadow-sm z-20">
                                    <ToolbarButton icon={<Bold size={16} />} onClick={() => insertMarkdown('**', '**')} tooltip="Bold" />
                                    <ToolbarButton icon={<Italic size={16} />} onClick={() => insertMarkdown('_', '_')} tooltip="Italic" />
                                    <ToolbarButton icon={<Heading size={16} />} onClick={() => insertMarkdown('## ')} tooltip="Heading" />
                                    <div className="w-[1px] h-4 bg-border mx-1" />
                                    <ToolbarButton icon={<LinkIcon size={16} />} onClick={() => insertMarkdown('[', '](url)')} tooltip="Link" />
                                    <ToolbarButton icon={<ImageIcon size={16} />} onClick={triggerImageUpload} tooltip="Upload Image" />
                                    <ToolbarButton icon={<Code size={16} />} onClick={() => insertMarkdown('```\n', '\n```')} tooltip="Code Block" />
                                    <ToolbarButton icon={<Quote size={16} />} onClick={() => insertMarkdown('> ')} tooltip="Quote" />
                                    <ToolbarButton icon={<List size={16} />} onClick={() => insertMarkdown('- ')} tooltip="List" />
                                </div>

                                <textarea
                                    ref={textareaRef}
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Tell your story..."
                                    className="w-full h-[60vh] bg-transparent resize-none outline-none text-lg leading-relaxed font-mono text-muted-foreground placeholder:text-muted-foreground/30"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Settings Sidebar */}
            <div className={cn(
                "w-80 border-l border-border bg-card/50 backdrop-blur-sm h-full overflow-y-auto transition-all duration-300 absolute right-0 top-0 bottom-0 md:relative",
                !showSettings && "translate-x-full md:w-0 md:translate-x-0 md:overflow-hidden md:border-l-0"
            )}>
                <div className="p-6 space-y-6 w-80">
                    <h3 className="font-semibold text-lg">Post Settings</h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full p-2 rounded-md bg-background border border-border focus:border-primary outline-none text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full p-2 rounded-md bg-background border border-border focus:border-primary outline-none text-sm h-24 resize-none"
                                placeholder="A short summary..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full p-2 rounded-md bg-background border border-border focus:border-primary outline-none text-sm"
                                placeholder="react, design, tutorial"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cover Image</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.cover_image}
                                    onChange={e => setFormData({ ...formData, cover_image: e.target.value })}
                                    className="flex-1 p-2 rounded-md bg-background border border-border focus:border-primary outline-none text-sm"
                                    placeholder="https://..."
                                />
                                <label className="p-2 bg-muted rounded-md cursor-pointer hover:bg-muted/80 transition-colors">
                                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleCoverImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            {formData.cover_image && (
                                <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border mt-2">
                                    <img src={formData.cover_image} alt="Cover" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={e => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium group-hover:text-primary transition-colors">Publish immediately</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ icon, onClick, tooltip }: { icon: React.ReactNode, onClick: () => void, tooltip: string }) {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={tooltip}
        >
            {icon}
        </button>
    );
}
