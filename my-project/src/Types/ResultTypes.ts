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