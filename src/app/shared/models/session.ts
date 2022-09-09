export interface Session {
    isLive: boolean,
    name: string;
    date: Date;
    videos: Array<{ title: string, URL: string }>;
    teachingMaterials: Array<{ title: string, URL: string }>;
    galleryURLs: Array<string>;
}