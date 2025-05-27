export interface ProjectMedia {
    src: string;
    type: 'image' | 'video';
}

export interface ProjectData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    media: ProjectMedia[];
    link: string;
    client: string;
}

export const projects: ProjectData[] = [
    {
        id: '1',
        title: 'ASCII 3D Preview',
        subtitle: 'NextJS, Three.js, STL',
        description: `ASCII-style 3D model rendered from an .stl file using Three.js in a Next.js environment.`,
        media: [
            { src: '/projects/ASZCI.mp4', type: 'video' }
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ',
    },
    {
        id: '2',
        title: 'GIZ',
        subtitle: 'Vanilla JS, NodeJS, Vanilla CSS, Leaflet',
        description: `Simple GIS WEB NodeJS & Leaflet
An interactive map app to create, update, and delete locations, with a feature to calculate the distance from your current position to any selected or searched location.`,
        media: [
            { src: '/projects/GIZ.jpg', type: 'image' }
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ',
    },
    {
        id: '3',
        title: 'AKA RCHIVE',
        subtitle: 'React.JS, Express, Vanilla CSS, MongoDB',
        description: `This is a fullstack web application I built as my final project at SMK Tunas Media Depok in collaboration with AKA-Group. I was fully responsible for designing and developing the entire system—from frontend to backend—to solve their employee management, attendance tracking, and payroll needs.`,
        media: [
            { src: '/projects/Aka-Group.jpg', type: 'image' },
            { src: '/projects/Aka-Group04.jpg', type: 'image' }
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ',
    },
    {
        id: '4',
        title: 'RIZE CAFE CASHIER',
        subtitle: 'Laravel 11, Vanilla CSS, SQLite',
        description: `Simple cashier application designed to streamline payment processing at cafes. It features an easy-to-use interface for quick order handling and cash payments. Ideal for small cafes that need a basic and efficient cashier system.`,
        media: [
            { src: '/projects/Rize-Cafe02.png', type: 'image' },
            { src: '/projects/Rize-Cafe.png', type: 'image' }
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ',
    },
    {
        id: '5',
        title: 'OUR DOC',
        subtitle: 'Laravel 11, Vanilla CSS, SQLite',
        description: `Document Management Web Application, with document entry, document approval, custom fields features`,
        media: [
            { src: '/projects/OurDoc02.png', type: 'image' },
            { src: '/projects/OurDoc.png', type: 'image' },
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ',
    },
    {
        id: '6',
        title: 'Eatherz',
        subtitle: 'NextJS, Vanilla CSS',
        description: `Eatherz Landing Page`,
        media: [
            { src: '/projects/Eatherz02.png', type: 'image' },
            { src: '/projects/Eatherz.png', type: 'image' }
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ',
        // client: 'See ✦',
    },
];

