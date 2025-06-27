const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);
const qs = require("qs");
const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);
const Branch = require(`${__dirname}/../../models/branch/branchModel.js`);
const Center = require(`${__dirname}/../../models/center/centerModel.js`);
const {
  getSingleDocument,
  deleteDocument,
  updateDocument,
} = require(`${__dirname}/../factoryHandler.js`);

const getAllBranches = asyncHandler(async (req, res, next) => {
  const centerId = req.params.id;
  const parsedQuery = qs.parse(req.originalUrl.split("?")[1] || "");
  const features = new docuemntFeatures(Branch.find({ centerId }), parsedQuery)
    .filter()
    .sort()
    .paginate(req)
    .fields();
  const documents = await features.query;
  successResponse(res, 200, {
    data: { results: documents.length, page: req.page, documents },
  });
});

const createBranch = asyncHandler(async (req, res, next) => {
  const centerId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;
  const center = await Center.findById(centerId);
  if (center.ownerId == userId && userRole === "centerAdmin") {
    const { name, address, geoLocation, phone, operatingHours } = req.body;
    const branch = await Branch.create({
      name,
      address,
      geoLocation,
      phone,
      operatingHours,
      centerId,
    });
    branch.isActive = undefined;
    branch.__v = undefined;
    successResponse(res, 201, {
      message: "Branch created successfully.",
      data: branch,
    });
  } else {
    return next(new AppError("Unauthorized action", 403));
  }
});

const getSingleBranch = asyncHandler(async (req, res, next) => {
  getSingleDocument(Branch, req, res, next);
});
const updateBranch = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const updateableFields = [
    "name",
    "address",
    "geoLocation",
    "phone",
    "operatingHours",
  ];
  const bodyKeys = Object.keys(body);
  bodyKeys.forEach((el) => {
    if (!updateableFields.includes(el)) {
      delete body[el];
    }
  });
  body.updatedAt = Date.now();
  updateDocument(Branch, body, req, res, next);
});
const deleteBranch = asyncHandler(async (req, res, next) => {
  deleteDocument(Branch, req, res, next);
});

const getNearbyBranches = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [lng, lat] = [parseFloat(req.query.lng), parseFloat(req.query.lat)];
  const radius = parseFloat(req.query.radius) * 1000; // radius in meters

  // Validate required query params
  if (!lat || !lng || !radius) {
    return next(
      new AppError("Latitude, longitude, and radius are required.", 400)
    );
  }

  // Geospatial query for branches
  let branches = await Branch.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distance",
        spherical: true,
        maxDistance: radius,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $project: {
        name: 1,
        distance: 1,
        address: 1,
        geoLocation: 1,
      },
    },
  ]);
  branches.map((branch) => {
    branch.distance = (branch.distance / 1000).toFixed(2);
    return branch;
  });
  if (!branches || branches.length === 0) {
    return next(
      new AppError(
        "No nearby branches found for the provided coordinates.",
        404
      )
    );
  }

  // Respond with success
  successResponse(res, 200, {
    message: "Nearby branches retrieved successfully.",
    data: { results: branches.length, page, branches },
  });
});

module.exports = {
  getAllBranches,
  createBranch,
  getSingleBranch,
  updateBranch,
  deleteBranch,
  getNearbyBranches,
};
