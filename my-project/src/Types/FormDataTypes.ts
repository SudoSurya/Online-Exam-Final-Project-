import { AxiosError, AxiosResponse } from "axios";
import { Questions } from "./ApiResponses";

export type FormData = {
    subjectID: string;
    subjectName: string;
    Branch: string;
    TotalQuestions: number;
    marks: number;
    time: number;
    facultyName: string;
};
export type IExam = FormData & {
    Questions: Questions[];
}
 type PostExamResponseMessage = {
    message: string;
}

export type PostExamResponse = AxiosResponse<PostExamResponseMessage>;
export type AxiosErrorRes = AxiosError<PostExamResponseMessage>;