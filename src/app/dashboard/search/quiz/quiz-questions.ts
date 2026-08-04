// ─── Question Types ───────────────────────────────────────────────────────────

export type MultipleChoiceQuestion = {
    id: string
    type: "multiple-choice"
    question: string
    options: string[]
    answer: number          // index of correct option
}

export type MultipleAnswerQuestion = {
    id: string
    type: "multiple-answer"
    question: string
    options: string[]
    answers: number[]       // indices of all correct options
}

export type TrueFalseQuestion = {
    id: string
    type: "true-false"
    question: string
    answer: boolean
}

export type MatchingQuestion = {
    id: string
    type: "matching"
    question: string
    pairs: { left: string; right: string }[]  // correct pairings
}

export type Question =
    | MultipleChoiceQuestion
    | MultipleAnswerQuestion
    | TrueFalseQuestion
    | MatchingQuestion

// ─── Question Bank (keyed by quiz id) ────────────────────────────────────────

export const questionBank: Record<string, Question[]> = {
    q1: [
        {
            id: "q1-1",
            type: "multiple-choice",
            question: "Which hook is used to manage side effects in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            answer: 1,
        },
        {
            id: "q1-2",
            type: "true-false",
            question: "React components must always return a single root element.",
            answer: false,
        },
        {
            id: "q1-3",
            type: "multiple-answer",
            question: "Which of the following are valid React hooks?",
            options: ["useState", "useLoop", "useMemo", "useCallback", "useRender"],
            answers: [0, 2, 3],
        },
        {
            id: "q1-4",
            type: "matching",
            question: "Match each hook to its primary purpose.",
            pairs: [
                { left: "useState",    right: "Manage local state" },
                { left: "useEffect",   right: "Run side effects" },
                { left: "useContext",  right: "Access context values" },
                { left: "useRef",      right: "Reference DOM elements" },
            ],
        },
        {
            id: "q1-5",
            type: "multiple-choice",
            question: "What does the second argument to useEffect control?",
            options: [
                "The initial state value",
                "When the effect re-runs based on dependencies",
                "The return type of the component",
                "The rendering priority",
            ],
            answer: 1,
        },
        {
            id: "q1-6",
            type: "true-false",
            question: "Props can be modified directly inside a child component.",
            answer: false,
        },
    ],

    q2: [
        {
            id: "q2-1",
            type: "multiple-choice",
            question: "What does the TypeScript 'keyof' operator return?",
            options: [
                "The values of an object type",
                "A union of the keys of an object type",
                "A new mapped type",
                "An array of keys",
            ],
            answer: 1,
        },
        {
            id: "q2-2",
            type: "true-false",
            question: "TypeScript generics can only be used with functions.",
            answer: false,
        },
        {
            id: "q2-3",
            type: "multiple-answer",
            question: "Which are valid TypeScript utility types?",
            options: ["Partial", "Required", "Optional", "Readonly", "Nullable"],
            answers: [0, 1, 3],
        },
        {
            id: "q2-4",
            type: "matching",
            question: "Match each utility type to what it does.",
            pairs: [
                { left: "Partial<T>",  right: "Makes all properties optional" },
                { left: "Required<T>", right: "Makes all properties required" },
                { left: "Readonly<T>", right: "Prevents property mutation" },
                { left: "Pick<T, K>",  right: "Creates a type with selected keys" },
            ],
        },
        {
            id: "q2-5",
            type: "multiple-choice",
            question: "What is a discriminated union in TypeScript?",
            options: [
                "A union type with no common properties",
                "A union type where each member has a common literal property",
                "A type that excludes certain values",
                "A union of two generic types",
            ],
            answer: 1,
        },
    ],

    q4: [
        {
            id: "q4-1",
            type: "multiple-choice",
            question: "What command builds a Docker image from a Dockerfile?",
            options: ["docker run", "docker build", "docker create", "docker compose"],
            answer: 1,
        },
        {
            id: "q4-2",
            type: "true-false",
            question: "A Docker container is the same as a Docker image.",
            answer: false,
        },
        {
            id: "q4-3",
            type: "multiple-answer",
            question: "Which of the following are valid Dockerfile instructions?",
            options: ["FROM", "RUN", "EXECUTE", "COPY", "INSTALL"],
            answers: [0, 1, 3],
        },
        {
            id: "q4-4",
            type: "matching",
            question: "Match each Docker concept to its description.",
            pairs: [
                { left: "Image",      right: "A read-only template for containers" },
                { left: "Container",  right: "A running instance of an image" },
                { left: "Volume",     right: "Persistent storage for containers" },
                { left: "Network",    right: "Communication between containers" },
            ],
        },
        {
            id: "q4-5",
            type: "true-false",
            question: "Docker volumes persist data even after a container is deleted.",
            answer: true,
        },
    ],

    q7: [
        {
            id: "q7-1",
            type: "multiple-choice",
            question: "Which attack injects malicious scripts into web pages viewed by other users?",
            options: ["SQL Injection", "Cross-Site Scripting (XSS)", "CSRF", "Man-in-the-Middle"],
            answer: 1,
        },
        {
            id: "q7-2",
            type: "true-false",
            question: "HTTPS encrypts data in transit between client and server.",
            answer: true,
        },
        {
            id: "q7-3",
            type: "multiple-answer",
            question: "Which of the following are common password hashing algorithms?",
            options: ["MD5", "bcrypt", "Base64", "Argon2", "SHA-256"],
            answers: [1, 3, 4],
        },
        {
            id: "q7-4",
            type: "matching",
            question: "Match each attack type to its description.",
            pairs: [
                { left: "Phishing",       right: "Deceptive emails to steal credentials" },
                { left: "SQL Injection",  right: "Injecting SQL code into input fields" },
                { left: "DDoS",           right: "Overwhelming a server with traffic" },
                { left: "Ransomware",     right: "Encrypting files and demanding payment" },
            ],
        },
        {
            id: "q7-5",
            type: "multiple-choice",
            question: "What does 'least privilege' mean in security?",
            options: [
                "Users get maximum access by default",
                "Users only get the minimum permissions they need",
                "Admins share credentials with users",
                "Access is revoked after every session",
            ],
            answer: 1,
        },
        {
            id: "q7-6",
            type: "true-false",
            question: "Two-factor authentication significantly reduces the risk of account compromise.",
            answer: true,
        },
    ],

    q8: [
        {
            id: "q8-1",
            type: "multiple-choice",
            question: "Which AWS service is used for object storage?",
            options: ["EC2", "RDS", "S3", "Lambda"],
            answer: 2,
        },
        {
            id: "q8-2",
            type: "true-false",
            question: "AWS Lambda requires you to manage the underlying server infrastructure.",
            answer: false,
        },
        {
            id: "q8-3",
            type: "multiple-answer",
            question: "Which of these are AWS compute services?",
            options: ["EC2", "S3", "Lambda", "ECS", "RDS"],
            answers: [0, 2, 3],
        },
        {
            id: "q8-4",
            type: "matching",
            question: "Match each AWS service to its category.",
            pairs: [
                { left: "S3",      right: "Object storage" },
                { left: "RDS",     right: "Managed relational database" },
                { left: "EC2",     right: "Virtual compute instances" },
                { left: "Route 53",right: "DNS and routing" },
            ],
        },
        {
            id: "q8-5",
            type: "multiple-choice",
            question: "What is an AWS Region?",
            options: [
                "A single data center",
                "A group of Availability Zones in a geographic area",
                "A virtual private network",
                "A load balancer cluster",
            ],
            answer: 1,
        },
        {
            id: "q8-6",
            type: "true-false",
            question: "An Availability Zone is a single data center within a Region.",
            answer: false,
        },
    ],

    q11: [
        {
            id: "q11-1",
            type: "multiple-choice",
            question: "In Next.js App Router, where do you define metadata for a page?",
            options: [
                "In a _meta.js file",
                "By exporting a metadata object from the page file",
                "In next.config.ts",
                "In a layout.json file",
            ],
            answer: 1,
        },
        {
            id: "q11-2",
            type: "true-false",
            question: "Server Components in Next.js can directly use React hooks like useState.",
            answer: false,
        },
        {
            id: "q11-3",
            type: "multiple-answer",
            question: "Which of these are valid Next.js App Router file conventions?",
            options: ["page.tsx", "layout.tsx", "route.tsx", "loading.tsx", "error.tsx"],
            answers: [0, 1, 3, 4],
        },
        {
            id: "q11-4",
            type: "matching",
            question: "Match each Next.js file to its purpose.",
            pairs: [
                { left: "page.tsx",    right: "Defines the UI for a route" },
                { left: "layout.tsx",  right: "Shared UI wrapping child routes" },
                { left: "loading.tsx", right: "Shown while a segment loads" },
                { left: "error.tsx",   right: "Handles errors in a segment" },
            ],
        },
        {
            id: "q11-5",
            type: "multiple-choice",
            question: "What does the 'use client' directive do in Next.js?",
            options: [
                "Enables server-side rendering",
                "Marks a component as a Client Component",
                "Disables static generation",
                "Forces the component to use CSR only globally",
            ],
            answer: 1,
        },
    ],
}

// Fallback questions used for quizzes without a specific question bank entry
export const fallbackQuestions: Question[] = [
    {
        id: "fb-1",
        type: "multiple-choice",
        question: "Which of the following best describes a key-value store?",
        options: [
            "A relational database with foreign keys",
            "A simple database that maps keys to values",
            "A graph-based data store",
            "A document-oriented database",
        ],
        answer: 1,
    },
    {
        id: "fb-2",
        type: "true-false",
        question: "An API is a set of rules that allows different software applications to communicate.",
        answer: true,
    },
    {
        id: "fb-3",
        type: "multiple-answer",
        question: "Which of the following are HTTP methods?",
        options: ["GET", "SEND", "POST", "DELETE", "FETCH"],
        answers: [0, 2, 3],
    },
    {
        id: "fb-4",
        type: "matching",
        question: "Match each HTTP status code to its meaning.",
        pairs: [
            { left: "200", right: "OK – request succeeded" },
            { left: "404", right: "Not Found – resource missing" },
            { left: "500", right: "Internal Server Error" },
            { left: "401", right: "Unauthorized – authentication required" },
        ],
    },
    {
        id: "fb-5",
        type: "multiple-choice",
        question: "What does REST stand for?",
        options: [
            "Remote Execution State Transfer",
            "Representational State Transfer",
            "Request and Response Standard Transfer",
            "Relational Entity Sync Transfer",
        ],
        answer: 1,
    },
    {
        id: "fb-6",
        type: "true-false",
        question: "JSON stands for JavaScript Object Notation.",
        answer: true,
    },
]

export function getQuestionsForQuiz(quizId: string): Question[] {
    return questionBank[quizId] ?? fallbackQuestions
}
