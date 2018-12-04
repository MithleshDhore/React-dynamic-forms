export const MODEL = [
    { key: "name", label: "Name", rank: 1, visible: true },
    { key: "age", label: "Age", rank: 2, type: "number", visible: true },
    { key: "rating", label: "Rating", rank: 3, type: "number", visible: true },
    {
        key: "gender", label: "Gender", rank: 4, type: "radio", visible: true, options: [
            { key: "male", label: "Male", value: "male", rank: 1 },
            { key: "female", label: "Female", value: "female", rank: 2 }
        ]
    },
    {
        key: "qualification", label: "Qualification", rank: 5, type: "textarea", rows: 5, cols: 100, visible: true, conditions:
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
        key: "city", label: "City", rank: 6, type: "select", visible: true, options: [
            { key: "pune", label: "Pune", value: "pune", rank: 1 },
            { key: "bangalore", label: "Bangalore", value: "Bangalore", rank: 3 },
            { key: "mumbai", label: "Mumbai", value: "mumbai", rank: 2 }
        ]
    },
    {
        key: "skills", label: "Skills", rank: 7, type: "checkbox", visible: true, answerType: "multiple", options: [
            { key: "reactjs", label: "ReactJS", value: "reactjs", rank: 1 },
            { key: "angular", label: "Angular", value: "angular", rank: 2 },
            { key: "vuejs", label: "VueJS", value: "vuejs", rank: 3 }
        ]
    },
    {
        key: "address", label: "Address", rank: 8, visible: true, type: "group", fields: [
            { key: "address:address1", label: "Address Line 1", rank: 1, visible: true },
            { key: "address:address2", label: "Address Line 2", rank: 2, visible: true },
            {
                key: "address:city", label: "City", rank: 3, type: "checkbox", visible: true, answerType: "multiple", options: [
                    { key: "address:pune", label: "Pune", value: "pune", rank: 1 },
                    { key: "address:bangalore", label: "Bangalore", value: "Bangalore", rank: 3 },
                    { key: "address:mumbai", label: "Mumbai", value: "mumbai", rank: 2 }
                ]
            },
            {
                key: "address:state", label: "State", rank: 4, type: "select", visible: true, options: [
                    { key: "address:ca", label: "California", value: "CA", rank: 1 },
                    { key: "address:fl", label: "Florida", value: "FL", rank: 3 },
                    { key: "address:il", label: "Illinois", value: "IL", rank: 2 }
                ]
            }

        ]
    },
    { key: "test", label: "test", rank: 9, type: "range", visible: true },
]
