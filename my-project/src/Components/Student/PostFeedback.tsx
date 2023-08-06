import axios from "axios";
import { useForm } from "react-hook-form";
import useFeedback from "./useFeedback";
import StudentNav from "./StudentNav";
import { AxiosOkRes } from "../../Types/FormDataTypes";
interface Feedback {
  facultyName: string;
  feedback: string;
}
function PostFeedback() {
  const [faculty] = useFeedback();
  console.log(faculty);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Feedback>();

  const onSubmit = async (data:Feedback) => {
    try {
      const response:AxiosOkRes = await axios.post(
        "http://localhost:8088/user/post/feedback",
        data
      );
      console.log(response.data);
      alert(response.data.message);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StudentNav />
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-200 to-gray-200">
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
          <div className="py-4 px-8">
            <div className="mb-4">
              <h2 className="text-center text-3xl font-bold text-gray-800">
                Submit Feedback
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="faculty"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Faculty
                </label>
                <select
                  id="facultyName"
                  {...register("facultyName", { required: true })}
                  className={`border border-gray-400 rounded w-full py-2 px-3 ${
                    errors.facultyName ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a faculty member</option>
                  {faculty &&
                    faculty.map((option, index) => (
                      <option key={index} value={option.facultyName}>
                        {option.facultyName}
                      </option>
                    ))}
                </select>
                {errors.facultyName && (
                  <p className="text-red-500 mt-2">Faculty name is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  {...register("feedback", { required: true })}
                  className={`border border-gray-400 rounded w-full py-2 px-3 ${
                    errors.feedback ? "border-red-500" : ""
                  }`}
                />
                {errors.feedback && (
                  <p className="text-red-500 mt-2">
                    Feedback message is required
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostFeedback;
