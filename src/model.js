export const MODEL = [
    { key: "name", label: "Name", rank: 1, visible:true },
    { key: "age", label: "Age", rank: 2, type: "number", visible:true },
    { key: "rating", label: "Rating", rank: 3, type: "number", visible:true },
    {
        key: "gender", label: "Gender", rank: 4, type: "radio", visible:true, options: [
            { key: "male", label: "Male", value: "male", rank: 2 },
            { key: "female", label: "Female", value: "female", rank: 1 }
        ]
    },
    {
        key: "qualification", label: "Qualification", rank: 5, type: "textarea", rows: 5, cols: 100, visible:true, conditions:
            {
                and: [
                    { questionCode: "name", answerCode: "first" },
                    { questionCode: "age", answerCode: "20" }
                ],
                or: [
                    { questionCode: "gender", answerCode: "male" },
                    { questionCode: "skills", answerCode: "reactjs" }
                ]
            }
    },
    {
        key: "city", label: "City", rank: 6, type: "select", visible:true, options: [
            { key: "pune", label: "pune", value: "pune", rank: 1 },
            { key: "bangalore", label: "Bangalore", value: "Bangalore", rank: 3 },
            { key: "mumbai", label: "mumbai", value: "mumbai", rank: 2 }
        ]
    },
    {
        key: "skills", label: "Skills", rank: 7, type: "checkbox", visible:true, options: [
            { key: "reactjs", label: "ReactJS", value: "reactjs", rank: 1 },
            { key: "angular", label: "Angular", value: "angular", rank: 2 },
            { key: "vuejs", label: "VueJS", value: "vuejs", rank: 3 }
        ]
    }
]