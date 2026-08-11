import React from "react";
import { cn } from "../../lib/utils";

export function AvatarCircles({
  numPeople,
  className,
  avatarUrls = [],
}) {
  const maxVisible = 4;
  const visibleAvatars = avatarUrls.slice(0, maxVisible);
  const remainingCount = Math.max(0, (numPeople || avatarUrls.length) - visibleAvatars.length);

  return (
    <div className={cn("z-10 flex items-center -space-x-3 rtl:space-x-reverse", className)}>
      {visibleAvatars.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl || "#"}
          target={url.profileUrl ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="relative inline-block overflow-hidden rounded-full border-2 border-white bg-zinc-100 shadow-xs transition-transform hover:z-20 hover:scale-110"
        >
          <img
            className="h-9 w-9 object-cover rounded-full"
            src={url.imageUrl}
            alt={url.name || `Researcher ${index + 1}`}
            title={url.name}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </a>
      ))}
      {remainingCount > 0 && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-950 text-center text-[11px] font-bold text-white shadow-xs z-20">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
