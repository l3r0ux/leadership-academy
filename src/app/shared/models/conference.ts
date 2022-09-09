export interface Conference {
    isLive: boolean,
    country: string;
    date: Date;
    videos: Array<{ title: string, URL: string }>;
    teachingMaterials: Array<{ title: string, URL: string }>;
    galleryURLs: Array<string>;
}
