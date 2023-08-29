// Bring in the express server and create application
let express = require('express');
let app = express();
let userRepo = require("./repos/userRepo");
let examsRepo = require("./repos/examRepo");
let subjectsRepo = require("./repos/subjectRepo");
let errorHelper = require("./helpers/errorHelpers");
let cors = require('cors');


// Use the express Router object
let router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

//Configure CORS
app.use(cors());

// Create GET to return a list of all users
router.get('/users', function (req, res, next) {
    userRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All users retrieved.",
            "data": data
        });
    },
        function (err) {
            next(err);
        });
});

// Create GET/search?id=n&email=str to search for pies by 'id' and/or 'email'
router.get('/users/search', function (req, res, next) {
    let searchObject = {
        "id": req.query.id,
        "email": req.query.email
    };

    userRepo.search(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Search for users successful.",
            "data": data
        });
    });
});


// Create GET to return a single user by given id
router.get('/users/:id', function (req, res, next) {
    userRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "user retrieved",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The user '" + req.params.id + "'cound not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The user '" + req.params.id + "'cound not be found."
                }
            });

        }
    }, function (err) {
        next(err);
    });
});

router.post("/users", function (req, res, next) {
    userRepo.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New User Added.",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

router.put('/users/:id', function (req, res, next) {
    userRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to update the data
            userRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "User '" + req.params.id + "' updated.",
                    "data": data
                });
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The user '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The user '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
});


router.delete('/users/:id', function (req, res, next) {
    userRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to delete the data
            userRepo.delete(req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "The user '" + req.params.id + "' is deleted.",
                    "data": "user '" + req.params.id + "' deleted."
                });
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The user '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The user '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
});

router.patch('/users/:id', function (req, res, next) {
    userRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to update the data
            userRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "User '" + req.params.id + "' patched.",
                    "data": data
                });
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The user '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The user '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
});

// Create GET to return a list of all exams
router.get('/exams', function (req, res, next) {
    examsRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All exams retrieved.",
            "data": data
        });
    },
        function (err) {
            next(err);
        });
});

// Create GET to return a list of all exams
router.post('/exams', function (req, res, next) {
    examsRepo.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Exam Added.",
            "data": data
        });
    },
        function (err) {
            next(err);
        });
});

// Create GET to return a list of all subjects
router.get('/subjects', function (req, res, next) {
    subjectsRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All subjects retrieved.",
            "data": data
        });
    },
        function (err) {
            next(err);
        });
});

// // Create GET to return a list of all subjects
// router.post('/subjects', function (req, res, next) {
//     subjectsRepo.insert(req.body, function (data) {
//         res.status(201).json({
//             "status": 201,
//             "statusText": "Created",
//             "message": "New Subject Added.",
//             "data": data
//         });
//     },
//         function (err) {
//             next(err);
//         });
// });


// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Configure exception logger
app.use(errorHelper.logErrorsToConsole);
// Configure exception logger to file
app.use(errorHelper.logErrorsToFile);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);

// Create server to listen on port 5000
var server = app.listen(5001, function () {
    console.log('Node server is running on http://localhost:5001..');
});