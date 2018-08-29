export const MODEL = [
    { key: "name", label: "Name", rank: 1, props: { required: true } },
    { key: "age", label: "Age", rank: 2, type: "number" },
    { key: "rating", label: "Rating", rank: 3, type: "number", props: { min: 0, max: 5 } },
    {
        key: "gender", label: "Gender", rank: 4, type: "radio", options: [
            { key: "male", label: "Male", name: "gender", value: "male" },
            { key: "female", label: "Female", name: "gender", value: "female" }
        ]
    },
    { key: "qualification", label: "Qualification", rank: 5, type: "textarea", rows: 5, cols: 100 },
    {
        key: "city", label: "City", rank: 6, type: "select", options: [
            { key: "pune", label: "pune", value: "pune" },
            { key: "bangalore", label: "Bangalore", value: "Bangalore" },
            { key: "mumbai", label: "mumbai", value: "mumbai" },
        ]
    },
    {
        key: "skills", label: "Skills", rank: 7, type: "checkbox", options: [
            { key: "reactjs", label: "ReactJS", value: "reactjs" },
            { key: "angular", label: "Angular", value: "angular" },
            { key: "vuejs", label: "VueJS", value: "vuejs" },
        ]
    }
]