import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 3600; // Cache for 1 hour

export default async function BlogPage() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false });

  return (
    <main className="pt-20 bg-surface min-h-screen">
      <div className="bg-primary text-on-primary py-24 text-center">
        <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold mb-4">Travel Journal</h1>
        <p className="text-on-primary-container max-w-2xl mx-auto text-lg">Stories, tips, and inspiration from the world of luxury travel.</p>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog: any) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="bg-white rounded-2xl overflow-hidden luxury-shadow group flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img src={blog.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={blog.title} />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs font-bold tracking-widest uppercase text-secondary mb-3">
                    {new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h2 className="font-headline-md text-[24px] font-bold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-on-surface-variant line-clamp-3 text-sm flex-grow">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="mt-6 pt-6 border-t border-surface-variant flex items-center text-primary font-bold text-sm hover:text-secondary-container transition-colors">
                    Read Article →
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-on-surface-variant italic">
              No articles published yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
