const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const Center = require(`${__dirname}/../../models/center/centerModel.js`);
const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);
const {
  getAllDocuments,
  getSingleDocument,
  deleteDocument,
  updateDocument,
} = require(`${__dirname}/../factoryHandler.js`);

const getAllCenters = asyncHandler(async (req, res, next) => {
  getAllDocuments(Center, req, res, next);
});
const getSingleCenter = asyncHandler(async (req, res, next) => {
  getSingleDocument(Center, req, res, next);
});
const createCenter = asyncHandler(async (req, res, next) => {
  const { name, description, website, categories, contact, socialMedia } =
    req.body;
  const ownerId = req.user.id;
  if (req.user.role === "centerAdmin") {
    const center = await Center.create({
      name,
      description,
      ownerId,
      website,
      categories,
      contact,
      socialMedia,
    });
    center.isActive = undefined;
    center.__v = undefined;
    successResponse(res, 201, {
      message: "Center created successfully",
      data: center,
    });
  } else {
    return next(new AppError("Unauthorized action", 403));
  }
});
const deleteCenter = asyncHandler(async (req, res, next) => {
  deleteDocument(Center, req, res, next);
});
const updateCenter = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const updateableFields = [
    "name",
    "description",
    "website",
    "categories",
    "socialMedia",
    "contact",
  ];
  const bodyKeys = Object.keys(body);
  bodyKeys.forEach((el) => {
    if (!updateableFields.includes(el)) {
      delete body[el];
    }
  });
  body.updatedAt = Date.now();
  updateDocument(Center, body, req, res, next);
});

module.exports = {
  getAllCenters,
  getSingleCenter,
  createCenter,
  deleteCenter,
  updateCenter,
};
