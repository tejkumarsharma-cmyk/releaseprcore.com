'use client'

import { Link as LinkIcon } from 'lucide-react'

export function CopyUrlButton({ url }: { url: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[#d9dee8] bg-white px-4 text-xs font-semibold text-[#262E53] transition hover:border-[#3E85BD]/50"
      onClick={() => {
        void navigator.clipboard.writeText(url)
      }}
    >
      <LinkIcon className="h-4 w-4" aria-hidden />
      Copy link
    </button>
  )
}
