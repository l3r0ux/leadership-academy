export interface Conference {
    id?: string,
    country: string,
    conferences: Array<Session>
}

export interface Session {
    id?: string,
    isLive: boolean,
    date: Date;
    videos: Array<{ title: string, URL: string }>;
    teachingMaterials: Array<{ title: string, URL: string }>;
    galleryURLs: Array<string>;
}
