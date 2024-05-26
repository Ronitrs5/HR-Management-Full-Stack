const { default: mongoose } = require("mongoose");

const leaves = mongoose.Schema(
    {
        name:{
            type: String, 
            required: true,
        },
        eid:{
            type: Number, 
            required: true,
        },

        takenleave:{
            type: Number, 
            required: true,
        },
    },

    {
        timestamps: true
    }
);

const LEAVE = mongoose.model('leaves', leaves)
module.exports = LEAVE