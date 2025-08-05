import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // Blog postlarını oku
  const blogFile = path.join(process.cwd(), 'data', 'blog-posts.json');
  let posts: any[] = [];
  try {
    posts = JSON.parse(fs.readFileSync(blogFile, 'utf-8'));
  } catch (e) {}
  const post = posts.find((p) => p.id === params.id);
  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto pt-36 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-4">{post.date} • {post.author}</div>
      {post.image && (
        <img src={post.image} alt={post.title} className="mb-6 rounded-lg max-h-96 object-cover w-full" />
      )}
      <div className="prose prose-lg max-w-none mb-8">
        {post.content}
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-4">
          <span className="font-semibold text-gray-700">Etiketler: </span>
          {post.tags.map((tag: string) => (
            <span key={tag} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
} 