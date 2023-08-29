let fs = require('fs');
const FILE_NAME = "./assets/subjects.json";
let subjectRepo = {
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

    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let subjects = JSON.parse(data);
                subjects.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(subjects), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
            }
        });
    }
};

module.exports = subjectRepo;