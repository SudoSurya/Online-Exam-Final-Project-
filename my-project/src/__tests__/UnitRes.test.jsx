import { mount,test,expect,it} from "vitest";
import UnitResults from "../Components/Student/UnitResults";
test("UnitResults component", () => {
  it('should render "Result Not Found" message when no results are passed', () => {
    const wrapper = mount(UnitResults, { results: [] });
   

    expect(wrapper.find(".text-red-500").text()).toBe("Result Not Found");
  });

  test("should render the correct number of result rows and the average score when results are passed", () => {
    const results = [
      {
        _id: "1",
        SubjectID: "Math",
        SubjectName: "Mathematics",
        unit: "Algebra",
        totalQuestions: 10,
        duration: 600,
        timeTaken: 300,
        score: 80,
      },
      {
        _id: "2",
        SubjectID: "Science",
        SubjectName: "Science",
        unit: "Biology",
        totalQuestions: 15,
        duration: 900,
        timeTaken: 450,
        score: 90,
      },
    ];

    const wrapper = mount(UnitResults, { results });

    expect(wrapper.find("tbody tr")).toHaveLength(2);
    expect(wrapper.find("tbody td").map((td) => td.text())).toEqual([
      "Math Algebra 10 10 Minutes 5.00 Minutes 80",
      "Science Biology 15 15 Minutes 7.50 Minutes 90",
    ]);
    expect(wrapper.find("tbody td").last().text()).toBe("85.00");
  });
});
