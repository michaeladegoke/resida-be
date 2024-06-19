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

const contactsSchema = mongoose.Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String },
        phone_number: { type: String },
        subject: { type: String },
        message: { type: String },
       

        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    },
    {timestamps: true}   
);

module.exports = mongoose.model('contacts', contactsSchema);