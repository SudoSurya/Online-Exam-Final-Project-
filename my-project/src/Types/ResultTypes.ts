export interface IResult {
    _id: string;
    studentID: string;
    SubjectID: string;
    SubjectName: string;
    totalQuestions: number;
    duration: number;
    timeTaken: number;
    marks: number;
    score: number;
    facultyName: string;
}
export interface ResultsData {
    [index: number]: IResult;
}
export interface SResult {
    studentID: string;
    SubjectID: string;
    SubjectName: string;
    totalQuestions: number;
    duration: number;
    timeTaken: number;
    marks: number;
    score: number;
    facultyName: string;
    _id: string;
    isFailed: boolean;
}

export interface UserData {
    _id: string;
    userID: string;
    userName: string;
    userEmail: string;
    userBranch: string;
    Results: SResult[];
}