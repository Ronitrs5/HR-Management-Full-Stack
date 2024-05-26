const { default: mongoose } = require("mongoose");

const employee = mongoose.Schema(
    {
        name:{
            type: String, 
            required: true,
        },

        eid:{
            type: Number, 
            required: true,
        },

        email:{
            type: String, 
            required: true,
        },

        position:{
            type: String, 
            required: true,
        },

        leaves:{
            type: Number, 
            required: true,
        },

        salary:{
            type: Number, 
            required: true,
        },

        attendance:{
            type: Number, 
            required: true,
        },

        paid:{
            type: Boolean,
            required: true
        }
    },

    {
        timestamps: true
    }
);

const EMPLOYEE = mongoose.model('employee', employee)

module.exports = EMPLOYEE