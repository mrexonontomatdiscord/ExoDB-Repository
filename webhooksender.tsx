import { useState } from 'react';

type Embed = {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: { text: string; icon_url?: string };
  image?: { url: string };
  thumbnail?: { url: string };
  author?: { name: string; url?: string; icon_url?: string };
  timestamp?: string;
};

export default function WebhookSender() {
  const [embeds, setEmbeds] = useState<Embed[]>([{}]);
  const [mode, setMode] = useState<'pre' | 'manual' | 'content'>('pre');
  const [content, setContent] = useState('');
  const [manualJson, setManualJson] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [message, setMessage] = useState<
    { text: string; type: 'success' | 'error' } | null
  >(null);

  const addEmbed = () => {
    if (!cooldown && embeds.length < 3) setEmbeds([...embeds, {}]);
  };
  const removeEmbed = () => {
    if (!cooldown && embeds.length > 1) setEmbeds(embeds.slice(0, -1));
  };

  const sendWebhook = async () => {
    if (cooldown) return;
    setCooldown(true);
    try {
      const body =
        mode === 'manual'
          ? { embeds: JSON.parse(manualJson), content }
          : { embeds, content };
      const res = await fetch('/api/send-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) setMessage({ text: 'Sent successfully!', type: 'success' });
      else throw new Error('Failed');
    } catch {
      setMessage({ text: 'Error sending webhook.', type: 'error' });
    }
    setTimeout(() => setCooldown(false), 2000);
  };

  return (
    <div className="bg-[#111] p-6 rounded-2xl border border-neon shadow-neon-glow">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode('pre')}
          className="px-4 py-2 border border-neon text-neon text-shadow-neon rounded-lg"
        >
          Pre-made
        </button>
        <button
          onClick={() => setMode('manual')}
          className="px-4 py-2 border border-neon text-neon text-shadow-neon rounded-lg"
        >
          Manual JSON
        </button>
        <button
          onClick={() => setMode('content')}
          className="px-4 py-2 border border-neon text-neon rounded-lg"
        >
          Content
        </button>
      </div>

      {mode === 'content' ? (
        <textarea
          placeholder="Message content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-neon text-neon bg-background rounded-lg mb-4"
        />
      ) : mode === 'manual' ? (
        <textarea
          placeholder="Paste full embed JSON"
          value={manualJson}
          onChange={(e) => setManualJson(e.target.value)}
          className="w-full p-2 border border-neon text-neon bg-background rounded-lg mb-4"
        />
      ) : (
        <div className="flex flex-col gap-4 mb-4">
          {embeds.map((_, i) => (
            <div
              key={i}
              className="p-4 border border-neon rounded-lg text-neon"
            >
              <h3 className="mb-2">Embed {i + 1}</h3>
              {/* TODO: Add input fields for title, description, etc. */}
            </div>
          ))}
          <div className="flex gap-2">
            <button
              onClick={addEmbed}
              className="px-3 py-1 border border-neon rounded-lg"
            >
              + Embed
            </button>
            <button
              onClick={removeEmbed}
              className="px-3 py-1 border border-neon rounded-lg"
            >
              - Embed
            </button>
          </div>
        </div>
      )}

      <button
        onClick={sendWebhook}
        disabled={cooldown}
        className="px-6 py-3 bg-neon text-background rounded-lg hover:shadow-neon-glow transition"
      >
        Send
      </button>

      {message && (
        <p
          className={`mt-3 ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
