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