import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { VideoSlider } from './VideoSlider';

// Mock backend response data for videos
const mockYouTubeVideos = [
    {
        videoId: 'dQw4w9WgXcQ',
        title: 'Voorbeeld YouTube video met een langere titel om te zien hoe het eruit ziet',
        thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        duration: '3:24',
    },
    {
        videoId: 'jNQXAC9IVRw',
        title: 'Korte video titel',
        thumbnailUrl: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
        duration: '1:55',
    },
    {
        videoId: '9bZkp7q19f0',
        title: 'Een andere video met gemiddelde lengte titel',
        thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg',
        duration: '5:43',
    },
    {
        videoId: 'kJQP7kiw5Fk',
        title: 'Video vier met nog een langere titel die meerdere regels beslaat',
        thumbnailUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg',
        duration: '2:10',
    },
    {
        videoId: 'L_jWHffIx5E',
        title: 'Vijfde video voorbeeld',
        thumbnailUrl: 'https://img.youtube.com/vi/L_jWHffIx5E/mqdefault.jpg',
        duration: '4:32',
    },
    {
        videoId: 'ZZ5LpwO-An4',
        title: 'Langere video met uitgebreide uitleg',
        thumbnailUrl: 'https://img.youtube.com/vi/ZZ5LpwO-An4/mqdefault.jpg',
        duration: '1:15:30',
    },
    {
        videoId: 'HEXWRTEbj1I',
        title: 'Zevende video in de serie',
        thumbnailUrl: 'https://img.youtube.com/vi/HEXWRTEbj1I/mqdefault.jpg',
        duration: '8:45',
    },
    {
        videoId: 'RBtlPT23PTM',
        title: 'Laatste video voorbeeld',
        thumbnailUrl: 'https://img.youtube.com/vi/RBtlPT23PTM/mqdefault.jpg',
        duration: '6:12',
    },
];

const meta: Meta<typeof VideoSlider> = {
    title: 'Molecules/Newsfeed Molecules/VideoSlider',
    component: VideoSlider,
    parameters: {
        layout: 'padded',
        msw: {
            handlers: [
                http.get('/api/youtube/channel', ({ request }) => {
                    const url = new URL(request.url);
                    const maxResults = parseInt(url.searchParams.get('maxResults') || '10');

                    return HttpResponse.json(
                        mockYouTubeVideos.slice(0, maxResults),
                        { status: 200 }
                    );
                }),
            ],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VideoSlider>;

export const Default: Story = {
    args: {
        title: "Bekijk onze video's",
        videoConfig: {
            apiEndpoint: '/api/youtube/channel',
            channelId: 'UCxxxxxx',
            maxResults: 8,
        },
        showButton: true,
        buttonLabel: "Bekijk alle video's",
        buttonUrl: 'https://www.youtube.com/@nederlandsdagblad',
    },
};
