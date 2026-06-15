import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 3600;

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: blog } = await supabase.from('blogs').select('*').eq('slug', slug).single();

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-surface min-h-screen">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10"></div>
          <img alt={blog.title} className="w-full h-full object-cover" src={blog.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2560&q=80'} />
        </div>
        
        <div className="relative z-20 container max-w-4xl mx-auto px-margin-desktop text-center text-white mt-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-secondary-fixed hover:text-white transition-colors tracking-[3px] uppercase text-sm mb-6 font-bold">
            ← Back to Journal
          </Link>
          <h1 className="font-display-xl text-[48px] md:text-[64px] leading-[1.1] font-bold mb-6 drop-shadow-2xl">
            {blog.title}
          </h1>
          <p className="text-lg italic opacity-90">
            Published {new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-margin-desktop py-24">
        <div className="prose prose-lg max-w-none text-on-surface prose-headings:text-primary prose-headings:font-bold prose-a:text-secondary hover:prose-a:text-secondary-container prose-img:rounded-xl luxury-shadow-sm prose-hr:border-surface-variant">
          {/* Extremely basic markdown rendering for MVP. A real app would use react-markdown */}
          {blog.content.split('\n').map((paragraph: string, idx: number) => {
            if (paragraph.startsWith('# ')) return <h1 key={idx} className="text-4xl mt-12 mb-6">{paragraph.replace('# ', '')}</h1>;
            if (paragraph.startsWith('## ')) return <h2 key={idx} className="text-3xl mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
            if (paragraph.startsWith('### ')) return <h3 key={idx} className="text-2xl mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
            if (paragraph === '') return <br key={idx} />;
            return <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>;
          })}
        </div>
      </section>
    </main>
  );
}
