// Mocking props for the dashboard component 

const jalons: {title: string, hostedby: string, date: string, status: string, description: string}[] = [
    {
        title: 'First Audit UX',
        hostedby:'Freelance',
        date: '25 March',
        status: 'Approved',
        description: "Analysis of the existing, user interviews, recommandation reports."
    },
    {
        title: 'Wireframes & Architecture',
        hostedby:'Freelance',
        date: '25 March',
        status: 'Approved',
        description: "Analysis of the existing, user interviews, recommandation reports."
    },
    {
        title: 'High fidelity model',
        hostedby:'Freelance',
        date: '25 March',
        status: 'Ongoing',
        description: "Analysis of the existing, user interviews, recommandation reports."
    },
    {
        title: 'Interactive prototype',
        hostedby:'Freelance',
        date: '25 March',
        status: 'To do',
        description: "Analysis of the existing, user interviews, recommandation reports."
    },
    {
        title: 'Customer validation',
        hostedby:'Freelance',
        date: '25 March',
        status: 'To do',
        description: "Analysis of the existing, user interviews, recommandation reports."
    }
]

 const paymentInfos = {
    amount: 8500,
    fee: 850,
    status: 'locked',
    deadline: new Date().toDateString().replace(' ', ', ')
}

const informations = {
    missionSummary: "Complete redesign of the user experience of the MedTrack mobile application, including UX audit, wireframes, high-fidelity models and interactive prototype. The application must comply with the WCAG 2.1 AA accessibility standards.",
    deliverables: [
        'UX Audit Report (PDF)',
        'Low fidelity wireframes (Figma)',
        'High fidelity models – 24 screens (Figma)',
        'Clickable interactive prototype',
        'Components Kit (Design System)',
    ],
    criteria: [
        'SUS Score > 80',
        'WCAG 2.1 AA Compliance',
        'Validation by 3 test users',
        'Compatible with iOS 15+ and Android 12+',
    ]
}

const participants = [
    {
        name: 'Marie Lefevre',
        profil: 'ML',
        title: 'Client',
        enterprise: 'TechVision SAS'
    },
    {
        name: 'Marie Lefevre',
        profil: 'ML',
        title: 'Freelance',
    },
];

const files = [
    {
        filename: 'wireframes-v3.fig',
        type: 'FIGMA'
    },
    {
        filename: 'audit-ux-medtrack.pdf',
        type: 'PDF'
    },
    {
        filename: 'analytics-q4.xlsx',
        type: 'XLSX'
    }
];
const history= [
    {
        title: 'Mission created',
        actor: 'Marie Lefevre',
        date: new Date(Date.now()).toLocaleDateString(),
    },
    {
        title: 'Freelance selected: <Karim Benalli>',
        actor: 'Marie Lefevre',
        date: new Date(Date.now()).toLocaleDateString(),
    },
    {
        title: 'Mission setted to <Pending>',
        actor: 'Marie Lefevre',
        date: new Date(Date.now()).toLocaleDateString(),
    },
    {
        title: 'Submitted delivery: Final Audit UX',
        actor: 'Marie Lefevre',
        date: new Date(Date.now()).toLocaleDateString(),
    }
]

export {
    paymentInfos,
    jalons,
    informations,
    participants,
    files,
    history
}