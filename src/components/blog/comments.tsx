"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send, Calendar, User } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
}

export default function CommentsSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    // Load comments from LocalStorage
    const stored = localStorage.getItem(`comments-${postSlug}`);
    if (stored) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setComments(JSON.parse(stored));
    } else {
      // Default sample comments
      const defaults: Comment[] = [
        {
          id: "1",
          author: "Alex Rivers",
          date: "2026-07-06",
          text: "Very clear explanation of the algorithm setup. Are you planning to add support for GNN model testing as well?",
        },
      ];
      setComments(defaults);
      localStorage.setItem(`comments-${postSlug}`, JSON.stringify(defaults));
    }
  }, [postSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: name,
      date: new Date().toISOString().split("T")[0],
      text: text,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments-${postSlug}`, JSON.stringify(updated));

    setName("");
    setText("");
  };

  return (
    <div className="mt-16 pt-8 border-t border-white/5 space-y-8">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <MessageSquare size={20} className="text-primary-cyan" />
        <span>Discussion ({comments.length})</span>
      </h3>

      {/* Write Comment */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white/3 border border-white/5 rounded-3xl p-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted font-bold block mb-2">
          Join the conversation
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-2xl px-4 py-2.5 text-xs text-white outline-none transition-all duration-300"
          />
        </div>

        <textarea
          required
          rows={3}
          placeholder="Share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-white/5 border border-white/10 focus:border-primary-cyan rounded-2xl px-4 py-3 text-xs text-white outline-none transition-all duration-300 resize-none"
        />

        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-primary-cyan text-background-dark font-bold text-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,229,255,0.15)]"
        >
          <Send size={12} />
          <span>Post Comment</span>
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col gap-3 border border-white/5 hover:border-white/10 transition-colors duration-300"
          >
            <div className="flex justify-between items-center text-xs text-text-muted font-mono select-none">
              <span className="flex items-center gap-1 text-white/80">
                <User size={12} className="text-primary-cyan" /> {comment.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {comment.date}
              </span>
            </div>

            <p className="text-text-muted text-xs md:text-sm leading-relaxed font-light">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
