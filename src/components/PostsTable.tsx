import React from 'react';
import { Eye, Heart, MessageCircle, Share2, Bookmark, Flame, Film, Image as ImageIcon, Layers, RefreshCw, Plus, Trash } from 'lucide-react';
import { InstagramPost } from '../types';

interface PostsTableProps {
  posts: InstagramPost[];
  followersCount: number;
  onAddPost: () => void;
  onEditPost: (post: InstagramPost) => void;
  onDeletePost: (id: string) => void;
  isClientMode?: boolean;
}

export default function PostsTable({
  posts,
  followersCount,
  onAddPost,
  onEditPost,
  onDeletePost,
  isClientMode = false
}: PostsTableProps) {
  // Helper to calculate engagement
  const getPostEngagement = (post: InstagramPost) => {
    if (!followersCount || followersCount === 0) return '0.0';
    const interactions = (post.likes || 0) + (post.comments || 0) + (post.shares || 0) + (post.saves || 0);
    return ((interactions / followersCount) * 100).toFixed(1);
  };

  const getFormatIcon = (type: string) => {
    switch (type) {
      case 'reel':
        return <Film className="w-4 h-4 text-purple-600" />;
      case 'carousel':
        return <Layers className="w-4 h-4 text-indigo-600" />;
      case 'story':
        return <RefreshCw className="w-4 h-4 text-amber-600 animate-spin-slow" />;
      default:
        return <ImageIcon className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Posts con Mayor Rendimiento</h4>
          <p className="text-xs text-slate-400 mt-1">Lista de las mejores publicaciones del periodo con cálculo de tasa de interacción.</p>
        </div>
        {!isClientMode && (
          <button
            onClick={onAddPost}
            className="flex items-center gap-2 text-xs bg-slate-900 text-white font-medium px-3.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Post
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
              <th className="py-3 px-4 font-normal">Tipo / Post</th>
              <th className="py-3 px-2 font-normal text-right">Likes</th>
              <th className="py-3 px-2 font-normal text-right">Coment.</th>
              <th className="py-3 px-2 font-normal text-right">Compart.</th>
              <th className="py-3 px-2 font-normal text-right">Guard.</th>
              <th className="py-3 px-3 font-normal text-center">Engagement %</th>
              {!isClientMode && <th className="py-3 px-4 font-normal text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {posts && posts.length > 0 ? (
              posts.map((post) => {
                const enRate = getPostEngagement(post);
                return (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Content / Caption */}
                    <td className="py-3.5 px-4 max-w-xs md:max-w-md">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg mt-0.5 shrink-0">
                          {getFormatIcon(post.type)}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 font-mono block">
                            {post.type}
                          </span>
                          <p className="text-xs text-slate-700 truncate font-sans leading-relaxed block mt-0.5" title={post.caption}>
                            {post.caption || '(Sin título de pie de foto)'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Likes */}
                    <td className="py-3.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-600 font-mono text-xs">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
                        <span>{post.likes?.toLocaleString() || 0}</span>
                      </div>
                    </td>

                    {/* Comments */}
                    <td className="py-3.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-600 font-mono text-xs">
                        <MessageCircle className="w-3 h-3 text-blue-500" />
                        <span>{post.comments?.toLocaleString() || 0}</span>
                      </div>
                    </td>

                    {/* Shares */}
                    <td className="py-3.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-600 font-mono text-xs">
                        <Share2 className="w-3 h-3 text-emerald-500" />
                        <span>{post.shares?.toLocaleString() || 0}</span>
                      </div>
                    </td>

                    {/* Saves */}
                    <td className="py-3.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-600 font-mono text-xs">
                        <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                        <span>{post.saves?.toLocaleString() || 0}</span>
                      </div>
                    </td>

                    {/* Engagement % */}
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold ${parseFloat(enRate) > 10 ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>
                        <Flame className="w-3 h-3" />
                        {enRate}%
                      </span>
                    </td>

                    {/* Actions */}
                    {!isClientMode && (
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEditPost(post)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => onDeletePost(post.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-slate-400 font-mono">
                  No hay publicaciones principales registradas. Usa el botón "Agregar Post" o sube una captura de pantalla.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
