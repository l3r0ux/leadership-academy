export interface Session {
    id?: string,
    isLive: boolean,
    name: string;
    date: Date;
    videos: Array<{ title: string, URL: string }>;
    teachingMaterials: Array<{ title: string, URL: string }>;
    galleryURLs: Array<string>;
}