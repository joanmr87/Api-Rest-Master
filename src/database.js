let id = 2;
const DB = [
    {id: 1, name: 'Dante', age: 3},
    {id: 5, name: 'Astor', age: 10}
];

module.exports = {
    DB,
    add(user) {
        id++;
        user.id = id;

        DB.push(user);
    },
};