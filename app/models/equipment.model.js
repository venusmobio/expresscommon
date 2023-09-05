const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    type: { type: String },
    manufacturer: [{ type: String }],
    modelNumber: { type: String },
    serielNumber: { type: String },
    unitType: { type: String },
    unitMeasurement: { type: Number },
    certification: { type: String },
    certificationType: { type: String },
    certificationValid: { type: Date },
    warranty: { type: String },
    information: { type: String },
    purchaseDate: { type: Date },
    warehouse: { type: String },
    quantity: { type: Number },
    quantityAlert: { type: String },
    barcodeSymbology: { type: String },
    itemCode: { type: String },
    status: { type: String },
    images: [{ type: String }],
    projectDocuments: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
