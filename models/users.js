const mongoose = require("mongoose");
const { plugin } = require("mongoose");
// const { softDelete } = require("softdelete -mongoose-plugin");

// //define soft delet field
// const IS_DELETED_FIELD = "isDeleted";
// const DELETED_AT_FIELD = "deletedAt";

// //use soft delete plugin
// plugin (
//     softDelete({
//         isDeletedField: IS_DELETED_FIELD,
//         deletedAtField: DELETED_AT_FIELD,
//     }).plugin()
// );

const usersSchema = mongoose.Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        phone_number: { type: String },
        subject: { type: String },
        message: { type: String },
        email: {
            type: String,
            required: true,
            unique: true,
            lowwcercase: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
           
        },
        password: {type: String, required:true},

        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    },
    {timestamps: true}   
);

module.exports = mongoose.model('users', usersSchema);