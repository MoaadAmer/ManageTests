let fs = require('fs');
const FILE_NAME = "./assets/users.json";
let userRepo = {
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },

    getById: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let user = JSON.parse(data).find(user => user.id == id);
                resolve(user);
            }
        });
    },

    search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let users = JSON.parse(data);
                // Perform search
                if (searchObject) {
                    users = users.filter(
                        user => (searchObject.id ? user.id == searchObject.id : true) &&
                            (searchObject.email ? user.email == searchObject.email : true));
                }
                resolve(users);
            }
        });
    },

    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let users = JSON.parse(data);
                users.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(users), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
            }
        });
    },

    update: function (newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let users = JSON.parse(data);
                let user = users.find(u => u.id == id);
                if (user) {
                    Object.assign(user, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(users), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    });
                }
            }
        });
    },

    delete: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let users = JSON.parse(data);
                let index = users.findIndex(u => u.id == id);
                if (index != -1) {
                    users.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(users), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(index);
                        }
                    });
                }
            }
        });
    }
}

module.exports = userRepo;