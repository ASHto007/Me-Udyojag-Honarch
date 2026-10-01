import { useId, useState } from 'react';
import { ArrowUpRight, Play, Video, X } from 'lucide-react';
import { SectionBackdrop } from './SectionBackdrop';
import { Modal } from './ui/Modal';
import { YOUTUBE_VIDEOS } from '../data/videosData';

type CommunityVideo = (typeof YOUTUBE_VIDEOS)[number];

export function Videos() {
  const [selected, setSelected] = useState<CommunityVideo | null>(null);
  const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);
  const titleId = useId();

  return (
    <section id="videos" aria-labelledby="videos-heading" className="section-with-backdrop relative overflow-hidden border-b border-[#EAEAEA] bg-[#FCFBF9] py-16 sm:py-24">
      <SectionBackdrop label="VIDEOS" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9A4D00]">
              <Video aria-hidden="true" className="h-4 w-4" /> Watch &amp; Learn
            </p>
            <h2 id="videos-heading" className="text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
              Voices of Entrepreneurship
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6D6D6D] sm:text-base">
              Ideas, encouragement and conversations from Mi Udyojak Honarach. Watch stories from our platform, in their own words.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-[#9A4D00]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#E27500]" />
            6 videos from our YouTube collection
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {YOUTUBE_VIDEOS.map((video, index) => (
            <article key={video.id} className="group overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-sm transition-shadow hover:shadow-lg">
              <button type="button" aria-label={'Play video: ' + video.title}
                onClick={event => { setTrigger(event.currentTarget); setSelected(video); }}
                className="relative block aspect-video w-full cursor-pointer overflow-hidden bg-[#1B2A3A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#E27500]">
                <img src={'https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg'} alt="" loading="lazy" decoding="async" width={480} height={360}
                  className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/70 via-transparent to-[#0B1320]/10" />
                <span className="absolute left-4 top-4 rounded-full bg-[#0B1320]/85 px-2.5 py-1 text-xs font-semibold text-white">{video.isShort ? 'YouTube Short' : 'YouTube'}</span>
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-[#E27500] text-white shadow-lg motion-safe:transition-transform motion-safe:group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                  </span>
                </span>
                <span aria-hidden="true" className="absolute bottom-3 right-4 font-mono text-xs text-white/90">{String(index + 1).padStart(2, '0')} / 06</span>
              </button>
              <div className="p-5">
                <p className="mb-2 text-xs font-semibold text-[#9A4D00]">{video.label}</p>
                <h3 lang="mr" className="font-marathi text-base font-bold leading-relaxed text-[#111827]">{video.title}</h3>
                <a href={video.isShort ? 'https://www.youtube.com/shorts/' + video.id : 'https://www.youtube.com/watch?v=' + video.id}
                  target="_blank" rel="noopener noreferrer" aria-label={'Watch on YouTube: ' + video.title + ' (opens in a new tab)'}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-md text-xs font-bold text-[#4B5563] hover:text-[#9A4D00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E27500]">
                  Watch on YouTube <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)} labelledBy={titleId} trigger={trigger}
          className="flex items-center justify-center bg-black/85 p-3 sm:p-6">
          <div className="max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0B1320] text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:px-6">
              <h3 id={titleId} lang="mr" className="font-marathi pt-2 text-sm font-semibold leading-relaxed sm:text-base">{selected.title}</h3>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close video"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-[#E27500]">
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center bg-black">
              <iframe key={selected.id}
                src={'https://www.youtube-nocookie.com/embed/' + selected.id + '?autoplay=1&rel=0'}
                title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                className={selected.isShort ? 'aspect-[9/16] max-h-[65dvh] w-auto max-w-full border-0' : 'aspect-video w-full border-0'} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-gray-300 sm:px-6">
              <span>Mi Udyojak Honarach</span>
              <a href={'https://www.youtube.com/watch?v=' + selected.id} target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-md font-semibold text-orange-200 hover:text-white focus-visible:outline-2 focus-visible:outline-[#E27500]">
                Open on YouTube <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
