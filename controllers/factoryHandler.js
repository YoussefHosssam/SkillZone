const docuemntFeatures = require(`${__dirname}/../utils/apiFeatures.js`);
const qs = require("qs");
const AppError = require(`${__dirname}/../utils/errorHandleClass.js`);

const { successResponse } = require(`${__dirname}/../utils/successResponse.js`);

const createDocument = async (req, res, next) => {};
const getAllDocuments = async (Model, req, res, next) => {
  const parsedQuery = qs.parse(req.originalUrl.split("?")[1] || "");
  const features = new docuemntFeatures(Model.find(), parsedQuery)
    .filter()
    .sort()
    .paginate(req)
    .fields();
  const documents = await features.query;
  successResponse(res, 200, {
    data: { results: documents.length, page: req.page, documents },
  });
};
const getSingleDocument = async (Model, req, res, next) => {
  const id = req.params.id;
  const document = await Model.findById(id);
  if (document) {
    successResponse(res, 200, { data: { result: document.length, document } });
  } else {
    return next(new AppError("No document found", 404));
  }
};
const deleteDocument = async (Model, req, res, next) => {
  const { id } = req.params;
  const document = await Model.findByIdAndDelete(id);
  if (document) {
    successResponse(res, 204, { message: "Docuemnt removed successfully" });
  } else {
    return next(new AppError("Docuemnt not found", 404));
  }
};
const updateDocument = async (Model, body, req, res, next) => {
  const { id } = req.params;
  const document = await Model.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (document) {
    successResponse(res, 200, {
      message: "document updated successfully",
      data: document,
    });
  } else {
    return next(new AppError("document not found", 404));
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  deleteDocument,
  updateDocument,
};
