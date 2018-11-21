export const MODEL = [
    { key: "name", label: "Name", rank: 1, props: { required: true }, visible:true },
    { key: "age", label: "Age", rank: 2, type: "number", visible:true },
    { key: "rating", label: "Rating", rank: 3, type: "number", props: { min: 0, max: 5 }, visible:true },
    {
        key: "gender", label: "Gender", rank: 4, type: "radio", visible:true, options: [
            { key: "male", label: "Male", name: "gender", value: "male" },
            { key: "female", label: "Female", name: "gender", value: "female" }
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
            { key: "pune", label: "pune", value: "pune" },
            { key: "bangalore", label: "Bangalore", value: "Bangalore" },
            { key: "mumbai", label: "mumbai", value: "mumbai" }
        ]
    },
    {
        key: "skills", label: "Skills", rank: 7, type: "checkbox", visible:true, options: [
            { key: "reactjs", label: "ReactJS", value: "reactjs" },
            { key: "angular", label: "Angular", value: "angular" },
            { key: "vuejs", label: "VueJS", value: "vuejs" }
        ]
    }
]