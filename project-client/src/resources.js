const customerFields = ["name", "surname", "username", "password", "email", "position"];
const managerFields = [...customerFields, "gender", "salary", "experience", "phone", "precent", "hiredAt", "active"]
const employeeFields = [...managerFields, "review"];
const positions = {
    values: ["manager", "employee", "customer"],
    default: "customer",
    customer: {
        fields: customerFields
    },
    manager: {
        fields: managerFields
    },
    employee: {
        fields: employeeFields
    }

};
const permissions = {
    "user": ["manager"],
    "order": ["manager", "employee"]
}
const gender = {
    values: ["male", "female"],
    default: "female"
};

const experience = {
    values: ["1-5 years", "5-10 years", "over 10 years"],
    default: "1-5 years"
};

const review = {
    values: ['perfect', 'sufficient', 'insufficient'],
    default: "sufficient"
};

const salary = {
    min: 30,
    default: 70
};

const precent = {
    min: 10,
    max: 100,
    default: 100
};

module.exports = {
    positions,
    permissions,
    gender,
    experience,
    precent,
    salary,
    review
}

