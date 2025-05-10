module.exports = {
    base: "https://duque-bot-api.up.railway.app/api/v1",
    users: "/users",
    matches: "/matches",
    user: id => `/users/${id}`,
    match: id => `/matches/${id}`,
    field: (field) => `/${field}`,
    fields: (...field) => `/${field.join("/")}`,
}