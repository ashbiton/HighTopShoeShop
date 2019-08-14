const positions = {
    values: ["manager", "employee", "customer"],
    default: "customer"
};
const permissions = {
    "user": ["manager"],
    "order": ["manager", "employee"]
}
const gender = {
    values: ["male","female"],
    default: "female"
};

const experience = {
    values: ["1-5 years", "5-10 years", "over 10 years"],
    default: "1-5 years"
};

const review = {
    values: ['perfect', 'sufficient', 'insufficient'],
    default: "sufficient"
}

module.exports = {
    positions,
    permissions,
    gender,
    experience,
    review
}

