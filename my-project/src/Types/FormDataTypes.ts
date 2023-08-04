import { AxiosError, AxiosResponse } from "axios";
import { Questions } from "./ApiResponses";

export interface FormData {
    subjectID: string;
    subjectName: string;
    Branch: string;
    TotalQuestions: number;
    marks: number;
    time: number;
    facultyName: string;
}
export interface UnitTestFormData extends FormData {
    unit: string
}
export type IUExam = UnitTestFormData & {
    Questions: Questions[];
}
export type IExam = FormData & {
    Questions: Questions[];
}
export type PostExamResponseMessage = {
    message: string;
}

export type AxiosOkRes = AxiosResponse<PostExamResponseMessage>;
export type AxiosErrorRes = AxiosError<PostExamResponseMessage>;

export type FacultyRegistrationFormData = {
    facultyName: string;
    facultyNumber: number;
    facultyEmail: string;
    password: string;
    confirmPassword: string;
}