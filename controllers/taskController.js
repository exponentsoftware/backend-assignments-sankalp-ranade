const Task = require('../models/todo');

const addTask = async (req, res) => {
    try {
        const { user_name, title, category } = req.body;
        let task = new Task({
            user_name,
            title,
            category
        });
        let result = await task.save();
        return res.status(200).send({
            message: "Task created successfully",
            data: result
        });
    } catch (error) {
        console.log(error, "ERROR IN MONGO")
        return res.status(500).send({
            message: "We encountered some error while creating your task, please try again."
        })
    }
}

const deleteTaskById = async (req, res) => {
    try {
        let id = req.params.id;
        await Task.findByIdAndDelete(id);
        return res.status(200).send("deletion done");
    } catch(error) {
        return res.status(500).send("deletion error");
    }

}
const getTaskById = async (req, res) => {
    try {
        let queryObject = {};
        const { id, title, category } = req.params;
        if(!title) {
            return res.status(400).send({message: "Title is required."})
        }
        queryObject.id = id;
        if (title) {
            queryObject.title = title;
        }
        if (category) {
            queryObject.category = category;
        }

        let task = await Task.findOne(queryObject);
        if (!task) {
            return res.status(400).send({
                message: "No task found"
            });
        } else {
            return res.status(200).send({
                message: "Task fetched successfully.",
                data: task
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "We encountered some error while fetching data for you, please try again."
        })
    }
}

const getAllTasks = async (req, res) => {
    try {
        let tasks = await Task.find();
        // [], [{}]
        if (!tasks.length) {
            return res.status(400).send({
                message: "No task found"
            });
        } else {
            return res.status(200).send({
                message: "Task fetched successfully.",
                data: tasks
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "We encountered some error while fetching data for you, please try again."
        })
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    addTask,
    deleteTaskById
}