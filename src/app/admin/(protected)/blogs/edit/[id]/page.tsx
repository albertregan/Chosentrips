import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: blog } = await supabase.from('blogs').select('*').eq('id', id).single();

  if (!blog) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Edit Post</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Update the details for "{blog.title}".</p>
      </div>
      <BlogForm initialData={blog} />
    </div>
  );
}
