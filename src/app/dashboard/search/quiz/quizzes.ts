export type Quiz = {
    id: string
    title: string
    questionCount: number
    level: string
    duration: string
    topic: string
    postmark?: number
    description: string
}

export const quizzes: Quiz[] = [
    {
        id: "q1",
        title: "Modern React Fundamentals",
        questionCount: 15,
        level: "Beginner",
        duration: "20 min",
        topic: "Web Development",
        postmark: 85,
        description: "Master hooks, props, and component lifecycle basics."
    },
    {
        id: "q2",
        title: "Advanced TypeScript Patterns",
        questionCount: 12,
        level: "Advanced",
        duration: "18 min",
        topic: "Programming",
        postmark: 72,
        description: "Deep dive into generics, union types, and utility types."
    },
    {
        id: "q3",
        title: "Python for Data Science",
        questionCount: 20,
        level: "Intermediate",
        duration: "30 min",
        topic: "Data Science",
        description: "Exploring Pandas, NumPy, and basic visualization techniques."
    },
    {
        id: "q4",
        title: "Docker Containerization",
        questionCount: 10,
        level: "Intermediate",
        duration: "15 min",
        topic: "DevOps",
        postmark: 90,
        description: "Learn to build, ship, and run applications in containers."
    },
    {
        id: "q5",
        title: "System Design Principles",
        questionCount: 8,
        level: "Expert",
        duration: "25 min",
        topic: "Architecture",
        postmark: 60,
        description: "Scalability, load balancing, and microservices architecture."
    },
    {
        id: "q6",
        title: "CSS Grid & Flexbox Masterclass",
        questionCount: 25,
        level: "Beginner",
        duration: "35 min",
        topic: "Web Design",
        description: "Create responsive layouts without using external frameworks."
    },
    {
        id: "q7",
        title: "Cybersecurity Essentials",
        questionCount: 15,
        level: "Beginner",
        duration: "20 min",
        topic: "Security",
        postmark: 95,
        description: "Understanding common vulnerabilities and basic encryption."
    },
    {
        id: "q8",
        title: "AWS Cloud Practitioner",
        questionCount: 30,
        level: "Intermediate",
        duration: "45 min",
        topic: "Cloud Computing",
        postmark: 88,
        description: "Core services, billing models, and security in the AWS cloud."
    },
    {
        id: "q9",
        title: "SQL Query Optimization",
        questionCount: 12,
        level: "Advanced",
        duration: "18 min",
        topic: "Databases",
        description: "Learn indexing, execution plans, and performance tuning."
    },
    {
        id: "q10",
        title: "UI/UX Psychology",
        questionCount: 10,
        level: "Beginner",
        duration: "15 min",
        topic: "Design",
        postmark: 75,
        description: "User behavior patterns and cognitive load in interface design."
    },
    {
        id: "q11",
        title: "Next.js App Router Mastery",
        questionCount: 14,
        level: "Intermediate",
        duration: "22 min",
        topic: "Web Development",
        postmark: 82,
        description: "Server components, streaming, and advanced routing patterns."
    },
    {
        id: "q12",
        title: "Go Concurrency Deep Dive",
        questionCount: 18,
        level: "Expert",
        duration: "28 min",
        topic: "Programming",
        description: "Understanding Goroutines, Channels, and Select statements."
    }
];