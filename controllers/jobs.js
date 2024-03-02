const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");


const getAll = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
    res.status(StatusCodes.OK).json(jobs);
}

const getJob = async (req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({ _id: id, createdBy: req.user._id });
    if (!job) {
        throw new NotFoundError("Job does not exist");
    }

    res.status(StatusCodes.OK).json({ job });

}

const createJob = async (req, res) => {
    const job = new Job({ ...req.body, createdBy: req.user._id });
    await job.save();
    res.status(StatusCodes.CREATED).json(job);
}

const updateJob = async (req, res) => {
    if (req.body === " ") {
        throw new BadRequestError("Please provide correct values");
    }
    const user = req.user._id;
    const job = await Job.findByIdAndUpdate({ _id: req.params.id, createdBy: user }, req.body, { new: true, runValidators: true });
    res.status(StatusCodes.CREATED).json({ job });

}

const deleteJob = async (req, res) => {
    const user = req.user._id;
    const job = await Job.findByIdAndRemove({ _id: req.params.id, createdBy: user });
    if (!job) {
        throw new NotFoundError("Job does not found");
    }

    res.status(StatusCodes.OK).send();
}





module.exports = { getAll, updateJob, getJob, deleteJob, createJob }