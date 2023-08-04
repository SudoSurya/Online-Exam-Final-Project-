export interface IConductedExam {
    _id: string;
    subjectID: string;
    subjectName: string;
    Branch: string;
    TotalQuestions: number;
    marks: number;
    time: number;
    facultyName: string;
    questions: Questions[];
}
export type Questions = {
    Question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
}

export type TSubjectList = {
    subjectID: string;
    subjectName: string;
}
export interface TFaculty {
    _id: string;
    facultyName: string;
    facultyNumber: number;
    facultyEmail: string;
    password: string;
    confirmPassword: string;
    status: "approved" | "pending" | "rejected"; // Assuming the status can have these three values
    Subjects: Subject[];
    __v: number;
}

interface Subject {
    SubjectID: string;
    SubjectName: string;
    _id: string;
}
