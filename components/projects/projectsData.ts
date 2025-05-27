export interface ProjectData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    images: string[]; 
    link: string;
    client: string;
}

export const projects: ProjectData[] = [
    {
        id: '5',
        title: 'Eatherz',
        subtitle: 'NextJS, Vanilla CSS',
        description: `Eatherz Landing Page`,
        images: [
            '/projects/Eatherz02.png',
            '/projects/Eatherz.png',
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ✦',
    },
    {
        id: '1',
        title: 'AKA RCHIVE',
        subtitle: 'React.JS, Express, Vanilla CSS, MongoDB',
        description: `This is a fullstack web application I built as my final project at SMK Tunas Media Depok in collaboration with AKA-Group. I was fully responsible for designing and developing the entire system—from frontend to backend—to solve their employee management, attendance tracking, and payroll needs.`,
        images: [
            '/projects/Aka-Group.jpg',
            '/projects/Aka-Group04.jpg',
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ✦',
    },
    {
        id: '2',
        title: 'RIZE CAFE CASHIER',
        subtitle: 'Laravel 11, Vanilla CSS, SQLite',
        description: `Simple cashier application designed to streamline payment processing at cafes. It features an easy-to-use interface for quick order handling and cash payments. Ideal for small cafes that need a basic and efficient cashier system.`,
        images: [
            '/projects/Rize-Cafe02.png',
            '/projects/Rize-Cafe.png',
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ✦',
    },
    {
        id: '3',
        title: 'OUR DOC',
        subtitle: 'Laravel 11, Vanilla CSS, SQLite',
        description: `Document Management Web Application, with document entry, document approval, custom fields features`,
        images: [
            '/projects/OurDoc.png',
            '/projects/OurDoc02.png',
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ✦',
    },
    {
        id: '4',
        title: 'GIZ',
        subtitle: 'Vanilla JS, NodeJS, Vanilla CSS, Leaflet',
        description: `Simple GIS WEB NodeJS & Leaflet
An interactive map app to create, update, and delete locations, with a feature to calculate the distance from your current position to any selected or searched location.`,
        images: [
            '/projects/GIZ.jpg',
        ],
        link: 'https://github.com/aldiyusronazhar',
        client: 'See ✦',
    },
];

