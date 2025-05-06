module.exports = {
    base: "http://localhost:3000/api/v1",
    users: "/users",
    matches: "/matches",
    user: id => `/users/${id}`,
    match: id => `/matches/${id}`,
    field: (field) => `/${field}`,
    fields: (...field) => `/${field.join("/")}`,
}