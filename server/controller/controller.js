const facultyModel = require('../model/faculty_schema')
const departmentModel = require('../model/department_schema')
const teacherModel = require('../model/teacher_schema')
const semesterModel = require('../model/semester_schema')
const courseModel = require('../model/course_schema.js')
const loginModel = require('../model/login_schema.js')
const branchModel = require('../model/branch_schema.js')
const sessionModel = require('../model/session_schema.js')
const roomModel = require('../model/room_schema.js')
const cellModel = require('../model/cell_schema.js')
const axios = require('axios')
let message = ""

// create and save a new user
exports.create = async (req, res) => {
    try {

        // validate request
        if (!req.body) {
            res.status(400).send({ message: "Content can't be empty" });
            return;
        }

        // check for conflicts
        const tableConflict = await facultyModel.findOne({
            dept: req.body.dept,
            b_name: req.body.b_name,
            sem: req.body.sem,
            year: req.body.year
        })

        if (!tableConflict) {

            // create a new user
            const user = new facultyModel({
                dept: req.body.dept,
                b_name: req.body.b_name,
                sem: req.body.sem,
                year: req.body.year
            })

            // save data in mongodb
            await user.save()
        }

        res.redirect('/faculty')
    } catch (err) {
        res.status(500).send({ message: err.message || 'Something went wrong while saving data' })
    }
}

exports.createCell = async (req, res) => {
    try {
        const user = new cellModel({
            c_name: req.body.c_name,
            t_name: req.body.t_name,
            room_no: req.body.room_no
        })

        await user.save()

        res.redirect('/faculty')
    } catch (err) {
        res.status(500).send({ message: err.message || 'Something went wrong while saving cell data' })
    }
}

// retrive user(s)
exports.find = (req, res) => {

    // if id is provided then return a single user else return multiple users
    if (req.query.id) {
        const id = req.query.id
        facultyModel.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id })
            })
    } else {
        facultyModel.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || 'Something went wrong while retrieving data' })
            })
    }
}

exports.findCell = (req, res) => {

    // if id is provided then return a single user else return multiple users
    if (req.query.id) {
        const id = req.query.id
        cellModel.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id })
            })
    } else {
        cellModel.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || 'Something went wrong while retrieving data' })
            })
    }
}

// get the data
async function getDepartments() {
    try {
        const departments = await departmentModel.find({})
        return departments
    } catch (err) {
        console.log("Error while fetching departments' data")
    }
}

async function getTeachers() {
    try {
        const teachers = await teacherModel.find({})
        return teachers
    } catch (err) {
        console.log("Error while fetching teacher data")
    }
}

async function getSemesters() {
    try {
        const semesters = await semesterModel.find({})
        return semesters
    } catch (err) {
        console.log("Error while fetching semester data")
    }
}

async function getCourses() {
    try {
        const courses = await courseModel.find({})
        return courses
    } catch (err) {
        console.log("Error while fetching course data")
    }
}

async function getBranches() {
    try {
        const branches = await branchModel.find({})
        return branches
    } catch (err) {
        console.log("Error while fetching branch data")
    }
}

async function getSessions() {
    try {
        const sessions = await sessionModel.find({})
        return sessions
    } catch (err) {
        console.log("Error while fetching session data")
    }
}

async function getRooms() {
    try {
        const rooms = await roomModel.find({})
        return rooms
    } catch (err) {
        console.log("Error while fetching room data")
    }
}

exports.homeRoutes = (req, res) => {
    res.render('index')
}

// pass the values and render the faculty page
exports.assignFaculty = async (req, res) => {
    const departments = await getDepartments()
    const branches = await getBranches()
    const semesters = await getSemesters()
    const sessions = await getSessions()
    const courses = await getCourses()
    const teachers = await getTeachers()
    const rooms = await getRooms()
    axios.get('http://localhost:8080/api/cell')
        .then(function (response) {
            res.render('faculty', {
                departments: departments,
                branches: branches,
                semesters: semesters,
                sessions: sessions,
                message: message,
                courses: courses,
                teachers: teachers,
                rooms: rooms,
                users: response.data
            })
        })
        .catch(err => {
            res.send(err);
        })
}

// pass the values and render the display page
exports.displayTimeTable = async (req, res) => {
    const departments = await getDepartments()
    const semesters = await getSemesters()
    const { dept, sem, timing } = req.query
    const faculty = await facultyModel.find({
        dept: dept,
        sem: sem,
        timing: timing
    })
    res.render('display', {
        departments: departments,
        semesters: semesters,
        faculty: faculty
    })
}

// render the about page
exports.about = (req, res) => {
    res.render('about')
}

// render the login page
exports.login = async (req, res) => {
    const { id, pass } = req.query
    const login = await loginModel.findOne({})
    const reqId = login.id
    const reqPass = login.pass
    if (id == reqId && pass == reqPass) {
        res.redirect('/faculty')
    } else {
        res.render('login')
    }
}

exports.updateUser = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.params.id
    cellModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information" })
        })
}

exports.update = async (req, res) => {
    const courses = await getCourses()
    const teachers = await getTeachers()
    const rooms = await getRooms()
    axios.get('http://localhost:8080/api/cell', { params: { id: req.query.id } })
        .then(function (userData) {
            res.render('update', {
                user: userData.data,
                courses: courses,
                teachers: teachers,
                rooms: rooms
            })
        })
        .catch(err => {
            res.send(err);
        })
}