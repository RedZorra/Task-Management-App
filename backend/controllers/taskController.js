import Task from '../models/Task.js';

//Task create
export async function createTask(req, res) {
    const { title, description, priority } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            priority
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//access all tasks with pagination and sorting
export async function getTasks(req, res) {
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;
    try {
        const tasks = await Task.find()
            .sort(sortBy)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Task.countDocuments();
        res.json({ totalPages: Math.ceil(count / limit), tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//retrieve individual task 
export async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
};

//update task
export async function updateTask(req, res) {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//delete Task 
export async function deleteTask(req, res) {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Aufgabe nicht gefunden' });
        res.json({ message: 'Aufgabe erfolgreich gelöscht' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};