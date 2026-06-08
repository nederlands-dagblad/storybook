import React, { useEffect, useRef, useState } from 'react';
import Icon from '@atoms/basicAtoms/Icon/Icon';

export interface AudioPlayerProps {
    src: string;
    label?: string;
    className?: string;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5] as const;

const formatTime = (seconds: number): string => {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Played part = brand, unplayed part = light gray, set per value via inline background.
const trackBackground = (pct: number): string =>
    `linear-gradient(to right, var(--color-background-brand) ${pct}%, var(--color-border-gray-subtle) ${pct}%)`;

const rangeStyles = `
.ap-range {
    -webkit-appearance: none;
    appearance: none;
    height: 0.25rem;
    border-radius: 9999px;
    cursor: pointer;
}
.ap-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 9999px;
    background: var(--color-background-brand);
}
.ap-range::-moz-range-thumb {
    width: 0.875rem;
    height: 0.875rem;
    border: 0;
    border-radius: 9999px;
    background: var(--color-background-brand);
}
.ap-range::-moz-range-track {
    background: transparent;
}
`;

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, label, className = '' }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const previousVolume = useRef(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
    const speedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!speedMenuOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (speedRef.current && !speedRef.current.contains(e.target as Node)) {
                setSpeedMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [speedMenuOpen]);

    const volumeIcon = volume === 0 ? 'speaker-x' : volume < 0.5 ? 'speaker-low' : 'speaker-high';
    const playedPct = duration > 0 ? (currentTime / duration) * 100 : 0;
    const volumePct = volume * 100;

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            void audio.play();
        } else {
            audio.pause();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const time = Number(e.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const value = Number(e.target.value);
        audio.volume = value;
        setVolume(value);
        if (value > 0) previousVolume.current = value;
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const value = volume === 0 ? previousVolume.current || 1 : 0;
        audio.volume = value;
        setVolume(value);
    };

    const selectSpeed = (rate: number) => {
        const audio = audioRef.current;
        setPlaybackRate(rate);
        setSpeedMenuOpen(false);
        if (audio) audio.playbackRate = rate;
    };


    return (
        <div className={`flex flex-col gap-xs ${className}`}>
            <style>{rangeStyles}</style>
            {label && <span className="text-heading-m text-text-default">{label}</span>}

            <audio
                ref={audioRef}
                src={src}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="flex items-center gap-xs sm:gap-s w-full">
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pauzeer' : 'Afspelen'}
                    className="group shrink-0 inline-flex cursor-pointer"
                >
                    <Icon
                        name={isPlaying ? 'pause-circle' : 'play-circle'}
                        variant="fill"
                        size="l"
                        color="brand"
                        className="transition-colors duration-200 group-hover:text-text-brand-hover"
                    />
                </button>

                <div className="flex flex-1 items-center gap-xs min-w-0">
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        value={currentTime}
                        onChange={handleSeek}
                        aria-label="Tijdbalk"
                        className="ap-range flex-1 min-w-0"
                        style={{ background: trackBackground(playedPct) }}
                    />
                    <span className="shrink-0 text-meta-light text-text-gray tabular-nums">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>

                <div ref={speedRef} className="shrink-0 relative">
                    <button
                        type="button"
                        onClick={() => setSpeedMenuOpen((open) => !open)}
                        aria-haspopup="listbox"
                        aria-expanded={speedMenuOpen}
                        aria-label="Afspeelsnelheid"
                        className="inline-flex items-center px-xs py-xxs text-meta-regular text-text-gray border-s border-border-gray-subtle rounded-pill hover:bg-background-gray-subtle transition-colors cursor-pointer"
                    >
                        {playbackRate}x
                    </button>
                    {speedMenuOpen && (
                        <ul
                            role="listbox"
                            className="absolute top-full right-0 mt-xxs bg-background-default border-s border-border-gray-subtle shadow-s z-10 py-xxs"
                        >
                            {SPEEDS.map((rate) => (
                                <li key={rate}>
                                    <button
                                        type="button"
                                        role="option"
                                        aria-selected={rate === playbackRate}
                                        onClick={() => selectSpeed(rate)}
                                        className={`block w-full text-left px-s py-xxs whitespace-nowrap hover:bg-background-gray-subtle transition-colors ${
                                            rate === playbackRate
                                                ? 'text-meta-regular text-text-brand'
                                                : 'text-meta-light text-text-default'
                                        }`}
                                    >
                                        {rate}x
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Volume: desktop only — mobile relies on device buttons */}
                <div className="shrink-0 hidden sm:flex items-center gap-xxs">
                    <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={volume === 0 ? 'Geluid aanzetten' : 'Dempen'}
                        className="inline-flex cursor-pointer"
                    >
                        <Icon name={volumeIcon} variant="fill" size="s" color="gray" />
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={volume}
                        onChange={handleVolume}
                        aria-label="Volume"
                        className="ap-range w-16"
                        style={{ background: trackBackground(volumePct) }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
