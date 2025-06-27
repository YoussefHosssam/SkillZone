const xss = require("xss");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * Recursively sanitize strings in an object using xss and DOMPurify.
 */
function sanitizeInput(obj) {
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      // First basic cleanup (e.g. script tags)
      obj[key] = xss(obj[key]);
      // Then deeper sanitization for embedded HTML
      obj[key] = DOMPurify.sanitize(obj[key]);
    } else if (typeof obj[key] === "object") {
      sanitizeInput(obj[key]);
    }
  }
}

/**
 * Express middleware to sanitize incoming input.
 */
function sanitizeMiddleware(req, res, next) {
  if (req.body) sanitizeInput(req.body);
  if (req.query && typeof req.query === "object") sanitizeInput(req.query);
  if (req.params) sanitizeInput(req.params);
  next();
}

module.exports = sanitizeMiddleware;
