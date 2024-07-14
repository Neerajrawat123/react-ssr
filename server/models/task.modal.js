import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
        
    },
    status: {
        type:String,
        enum: ['TODO', 'PROGRESS', 'DONE'],
        default: 'TODO'
    },
    dueDate: {
        type: Date,

    }
},{
    timestamps: true
})

export const Task = model('Task', taskSchema)