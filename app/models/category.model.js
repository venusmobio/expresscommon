const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    description: { type: String,  },
    name: { type: String,  },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
