export interface Conference {
    country: string,
    conferences: Array<Session>
}

export interface Session {
    isLive: boolean,
    date: Date;
    videos: Array<{ title: string, URL: string }>;
    teachingMaterials: Array<{ title: string, URL: string }>;
    galleryURLs: Array<string>;
}
