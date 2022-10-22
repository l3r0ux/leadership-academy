import { Conference } from "./models/conference";
import { Session } from "./models/session";

export const conferences: Array<Conference> = [
    {
        id: '1',
        country: 'Istanbul',
        conferences: [
            {
                id: '2',
                isLive: true,
                date: new Date(),
                videos: [
                    {
                        title: 'Grass',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487351/leadership_clarity/Grass_e5pkp9.mp4',
                    },
                    {
                        title: 'Woman',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487349/leadership_clarity/Woman_npot0c.mp4',
                    },
                    {
                        title: 'Clouds',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487348/leadership_clarity/Clouds_znzvq9.mp4',
                    },
                    {
                        title: 'Sunset',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487346/leadership_clarity/Sunset_ntalpe.mp4'
                    }
                ],
                teachingMaterials: [
                    {
                        title: 'B1 level test',
                        URL: 'assets/B1_Level_test_pwbemk.pdf',
                    },
                    {
                        title: 'Picture exercises',
                        URL: 'assets/picture-description-going-for-a-walk-oneonone-activities-picture-description-exercises_118694_sjskjb.pdf'
                    }
                ],
                galleryURLs: [
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/dylan-gillis-KdeqA3aTnBY-unsplash_gjw9et.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/scott-graham-5fNmWej4tAA-unsplash_hfmxyk.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487471/leadership_clarity/markus-spiske-QozzJpFZ2lg-unsplash_r9fsz8.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/natalie-pedigo-wJK9eTiEZHY-unsplash_wtu0gs.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/jehyun-sung-6U5AEmQIajg-unsplash_ihftyq.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487468/leadership_clarity/jason-goodman-Oalh2MojUuk-unsplash_gu9ppm.jpg'
                ]
            },
        ],
    },
    {
        id: '2',
        country: 'Addis Ababa',
        conferences: [
            {
                id: '1',
                isLive: true,
                date: new Date(),
                videos: [
                    {
                        title: 'Grass',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487351/leadership_clarity/Grass_e5pkp9.mp4',
                    },
                    {
                        title: 'Woman',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487349/leadership_clarity/Woman_npot0c.mp4',
                    },
                    {
                        title: 'Clouds',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487348/leadership_clarity/Clouds_znzvq9.mp4',
                    },
                    {
                        title: 'Sunset',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487346/leadership_clarity/Sunset_ntalpe.mp4'
                    }
                ],
                teachingMaterials: [
                    {
                        title: 'B1 level test',
                        URL: 'assets/B1_Level_test_pwbemk.pdf',
                    },
                    {
                        title: 'Picture exercises',
                        URL: 'assets/picture-description-going-for-a-walk-oneonone-activities-picture-description-exercises_118694_sjskjb.pdf'
                    }
                ],
                galleryURLs: [
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/dylan-gillis-KdeqA3aTnBY-unsplash_gjw9et.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/scott-graham-5fNmWej4tAA-unsplash_hfmxyk.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487471/leadership_clarity/markus-spiske-QozzJpFZ2lg-unsplash_r9fsz8.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/natalie-pedigo-wJK9eTiEZHY-unsplash_wtu0gs.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/jehyun-sung-6U5AEmQIajg-unsplash_ihftyq.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487468/leadership_clarity/jason-goodman-Oalh2MojUuk-unsplash_gu9ppm.jpg'
                ]
            },
            {
                id: '2',
                isLive: true,
                date: new Date(),
                videos: [
                    {
                        title: 'Grass',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487351/leadership_clarity/Grass_e5pkp9.mp4',
                    },
                    {
                        title: 'Woman',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487349/leadership_clarity/Woman_npot0c.mp4',
                    },
                    {
                        title: 'Clouds',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487348/leadership_clarity/Clouds_znzvq9.mp4',
                    },
                    {
                        title: 'Sunset',
                        URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487346/leadership_clarity/Sunset_ntalpe.mp4'
                    }
                ],
                teachingMaterials: [
                    {
                        title: 'B1 level test',
                        URL: 'assets/B1_Level_test_pwbemk.pdf',
                    },
                    {
                        title: 'Picture exercises',
                        URL: 'assets/picture-description-going-for-a-walk-oneonone-activities-picture-description-exercises_118694_sjskjb.pdf'
                    }
                ],
                galleryURLs: [
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/dylan-gillis-KdeqA3aTnBY-unsplash_gjw9et.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/scott-graham-5fNmWej4tAA-unsplash_hfmxyk.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487471/leadership_clarity/markus-spiske-QozzJpFZ2lg-unsplash_r9fsz8.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/natalie-pedigo-wJK9eTiEZHY-unsplash_wtu0gs.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/jehyun-sung-6U5AEmQIajg-unsplash_ihftyq.jpg',
                    'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487468/leadership_clarity/jason-goodman-Oalh2MojUuk-unsplash_gu9ppm.jpg'
                ]
            },
        ],
    },
]

export const sessions: Array<Session> = [
    {
        id: '1',
        name: 'Session one',
        isLive: true,
        date: new Date(),
        videos: [
            {
                title: 'Grass',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487351/leadership_clarity/Grass_e5pkp9.mp4',
            },
            {
                title: 'Woman',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487349/leadership_clarity/Woman_npot0c.mp4',
            },
            {
                title: 'Clouds',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487348/leadership_clarity/Clouds_znzvq9.mp4',
            },
            {
                title: 'Sunset',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487346/leadership_clarity/Sunset_ntalpe.mp4'
            }
        ],
        teachingMaterials: [
            {
                title: 'B1 level test',
                URL: 'assets/B1_Level_test_pwbemk.pdf',
            },
            {
                title: 'Picture exercises',
                URL: 'assets/picture-description-going-for-a-walk-oneonone-activities-picture-description-exercises_118694_sjskjb.pdf'
            }
        ],
        galleryURLs: [
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/dylan-gillis-KdeqA3aTnBY-unsplash_gjw9et.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/scott-graham-5fNmWej4tAA-unsplash_hfmxyk.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487471/leadership_clarity/markus-spiske-QozzJpFZ2lg-unsplash_r9fsz8.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/natalie-pedigo-wJK9eTiEZHY-unsplash_wtu0gs.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/jehyun-sung-6U5AEmQIajg-unsplash_ihftyq.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487468/leadership_clarity/jason-goodman-Oalh2MojUuk-unsplash_gu9ppm.jpg'
        ]
    },
    {
        id: '2',
        name: 'Session two',
        isLive: true,
        date: new Date(),
        videos: [
            {
                title: 'Grass',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487351/leadership_clarity/Grass_e5pkp9.mp4',
            },
            {
                title: 'Woman',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487349/leadership_clarity/Woman_npot0c.mp4',
            },
            {
                title: 'Clouds',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487348/leadership_clarity/Clouds_znzvq9.mp4',
            },
            {
                title: 'Sunset',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487346/leadership_clarity/Sunset_ntalpe.mp4'
            }
        ],
        teachingMaterials: [
            {
                title: 'B1 level test',
                URL: 'assets/B1_Level_test_pwbemk.pdf',
            },
            {
                title: 'Picture exercises',
                URL: 'assets/picture-description-going-for-a-walk-oneonone-activities-picture-description-exercises_118694_sjskjb.pdf'
            }
        ],
        galleryURLs: [
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/dylan-gillis-KdeqA3aTnBY-unsplash_gjw9et.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/scott-graham-5fNmWej4tAA-unsplash_hfmxyk.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487471/leadership_clarity/markus-spiske-QozzJpFZ2lg-unsplash_r9fsz8.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/natalie-pedigo-wJK9eTiEZHY-unsplash_wtu0gs.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/jehyun-sung-6U5AEmQIajg-unsplash_ihftyq.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487468/leadership_clarity/jason-goodman-Oalh2MojUuk-unsplash_gu9ppm.jpg'
        ]
    },
    {
        id: '3',
        name: 'Session three',
        isLive: true,
        date: new Date(),
        videos: [
            {
                title: 'Grass',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487351/leadership_clarity/Grass_e5pkp9.mp4',
            },
            {
                title: 'Woman',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487349/leadership_clarity/Woman_npot0c.mp4',
            },
            {
                title: 'Clouds',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487348/leadership_clarity/Clouds_znzvq9.mp4',
            },
            {
                title: 'Sunset',
                URL: 'https://res.cloudinary.com/djkyfcfl1/video/upload/v1662487346/leadership_clarity/Sunset_ntalpe.mp4'
            }
        ],
        teachingMaterials: [
            {
                title: 'B1 level test',
                URL: 'assets/B1_Level_test_pwbemk.pdf',
            },
            {
                title: 'Picture exercises',
                URL: 'assets/picture-description-going-for-a-walk-oneonone-activities-picture-description-exercises_118694_sjskjb.pdf'
            }
        ],
        galleryURLs: [
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/dylan-gillis-KdeqA3aTnBY-unsplash_gjw9et.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487472/leadership_clarity/scott-graham-5fNmWej4tAA-unsplash_hfmxyk.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487471/leadership_clarity/markus-spiske-QozzJpFZ2lg-unsplash_r9fsz8.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/natalie-pedigo-wJK9eTiEZHY-unsplash_wtu0gs.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487470/leadership_clarity/jehyun-sung-6U5AEmQIajg-unsplash_ihftyq.jpg',
            'https://res.cloudinary.com/djkyfcfl1/image/upload/v1662487468/leadership_clarity/jason-goodman-Oalh2MojUuk-unsplash_gu9ppm.jpg'
        ]
    },
]