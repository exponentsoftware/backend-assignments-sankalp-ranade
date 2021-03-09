const mongoonse = require('mongoose');

const TaskSchema = mongoonse.Schema({
    user_name: {
        type: String,
        required: [true, "Username is required."]
    },
    title: {
        type: String,
        required: [true, "Title is required."]
    },
    status: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        enum: ["Work", "Hobby", "Task"],
        required: [true, "Please add category"],
}
}, {
    timestamps: true
});

module.exports = mongoonse.model('Task', TaskSchema);