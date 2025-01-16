import e, { RequestHandler } from "express";
import { StandardResponse } from "../Helper/standardResponse";
import { Estate, EstateType } from "./estate_model";
import { ErrorWithStatus } from "../Helper/errorhandler";
import mongoose, { Types } from "mongoose";

type Image = {
  filename: string;
  originalname: string;
};
// Create
export const add: RequestHandler<
  unknown,
  StandardResponse<EstateType>,
  EstateType,
  unknown
> = async (req, res, next) => {
  try {
    const { tokenData } = req;
    const {
      name,
      description,
      location,
      price,
      availability,
      listingType,
      status,
      propertyType,
      features,
    } = req.body;

    // Construct the new apartment document
    const newApartmentData = {
      name,
      description,
      location: {
        address: location?.address,
        city: location?.city,
        state: location?.state,
        postalCode: location?.postalCode,
        coordinates: location?.coordinates,
      },
      price,
      availability: availability ?? true,
      images: [] as Image[],
      listingType,
      status,
      propertyType,
      features,
      addedBy: {
        user_id: tokenData._id,
        fullname: tokenData.fullname,
        email: tokenData.email,
      },
      dateAdded: new Date(),
    };

    // Add multiple images if uploaded
    if (req.files && Array.isArray(req.files)) {
      newApartmentData.images = req.files.map((file: Express.Multer.File) => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      }));
    }

    // Create the new apartment entry
    const newApartment = await Estate.create(newApartmentData);

    // Respond with the created apartment data
    res.json({ success: true, data: newApartment });
    console.log("Apartment added successifully");
  } catch (error) {
    next(error);
  }
};

// Read
export const get_propertyby_id: RequestHandler<
  { property_id: string },
  StandardResponse<EstateType | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    // console.log(property_id);
    const result = await Estate.findOne({
      _id: property_id,
    }).lean();
    console.log(result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
  }
};

// Update property by id based on the method type (PUT or PATCH)
export const update_propertyby_id: RequestHandler<
  { property_id: string },
  StandardResponse<number>,
  Partial<EstateType>,
  unknown
> = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const { tokenData } = req;
    const updatedField: Partial<EstateType> = req.body;

    const existingProperty = await Estate.findOne({
      _id: property_id,
      "addedBy.user_id": tokenData._id,
    });
    if (!existingProperty) {
      res.status(404).json({ success: false, data: 0 });
      throw new ErrorWithStatus(
        "Property not found or unauthorized access",
        403
      );
    }

    // Handle images if provided
    if (req.files && Array.isArray(req.files)) {
      const newImages = req.files.map((file: Express.Multer.File) => ({
        filename: file.filename,
        originalname: file.originalname,
      }));
      existingProperty.images.push(...newImages);
    }

    // Determine method type (PUT or PATCH)
    let result;
    if (req.method === "PUT") {
      result = await Estate.updateOne(
        { _id: property_id },
        { $set: updatedField }
      );
      res.json({ success: true, data: result.modifiedCount });
      console.log(result);
    } else if (req.method === "PATCH") {
      result = await Estate.updateOne(
        { _id: property_id },
        { $set: updatedField, $setOnInsert: { lastUpdated: new Date() } }
      );
      res.json({ success: true, data: result.modifiedCount });
      console.log(result);
    }
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, data: 0 });
  }
};

// Delete
export const delete_propertyby_id: RequestHandler<
  { property_id: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const { tokenData } = req;

    const result = await Estate.deleteOne({
      _id: property_id,
      "addedBy.user_id": tokenData._id,
    });

    if (result.deletedCount == 0) {
      res.json({ success: false, data: 0 });
    }
    res.json({ success: true, data: result.deletedCount });
  } catch (error) {
    console.log(error);
  }
};

// Get properties by property type
export const get_properties_by_property_type: RequestHandler<
  { propertyType: string },
  StandardResponse<EstateType[] | null>,
  unknown,
  { page?: string; limit?: string }
  // unknown
> = async (req, res, next) => {
  try {
    const { propertyType } = req.params;

    // Validate propertyType
    const validPropertyTypes = [
      "apartment",
      "house",
      "commercial",
      "villa",
      "office",
      "townhouse",
      "shop",
      "garage",
    ];
    if (!validPropertyTypes.includes(propertyType)) {
      res.status(400).json({
        success: false,
        data: null,
      });
    }

    // Parse query parameters
    const { page = "1", limit = "10" } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate parsed numbers
    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      res.status(400).json({
        success: false,
        data: null,
      });
    }

    // Query the database by propertyType with pagination
    const properties = await Estate.find({ propertyType: propertyType })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties by property type:", error);
    res.status(500).json({
      success: false,
      data: null,
    });
  }
};

export const get_properties_by_listing_type: RequestHandler<
  { listingType: string },
  StandardResponse<EstateType[] | null>,
  unknown,
  { page?: string; limit?: string }
> = async (req, res) => {
  const { listingType } = req.params;

  if (!["rent", "sale"].includes(listingType)) {
    res.json({ success: false, data: null });
  }
  try {
    const { page = "1", limit = "10" } = req.query;
    const listings = await Estate.find({ listingType })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .lean();
    res.json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching listings by listing type:", error);
    res.json({ success: false, data: null });
  }
};

// Create controller functions to add review and rating to a property
export const add_review: RequestHandler<
  { property_id: string },
  StandardResponse<string>,
  { review: string; rating: number },
  unknown
> = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const { review, rating } = req.body;
    const { tokenData } = req;
    // Update one property with the new review and rating
    const _id = new Types.ObjectId(); // Generate a new ObjectId for the review
    const result = await Estate.updateOne(
      {
        _id: property_id,
      },
      {
        $addToSet: {
          reviews: {
            _id,
            review,
            rating,
            by: {
              user_id: tokenData._id,
              fullname: tokenData.fullname,
            },
          },
        },
      }
    );

    res.json({
      success: true,
      data: result.modifiedCount ? _id.toString() : "",
    });
  } catch (error) {
    next(error);
  }
};

// Create controller functions to get all reviews and ratings for a property
export const get_reviews: RequestHandler<
  { property_id: string },
  StandardResponse<{ reviews: EstateType["reviews"] }>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const result = await Estate.findOne({ _id: property_id });
    console.log(result?.reviews);
    result && res.json({ success: true, data: { reviews: result.reviews } });
  } catch (error) {
    next(error);
  }
};

// Get reviews by property id
export const get_reviews_id: RequestHandler<
  { property_id: string; review_id: string },
  StandardResponse<EstateType["reviews"] | {}>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { property_id, review_id } = req.params;
    const result = await Estate.findOne(
      { _id: property_id, "reviews._id": review_id },
      { "reviews.$": 1, _id: 0 }
    ).lean();
    if (result) {
      res.json({
        success: true,
        data: result.reviews.length ? result.reviews[0] : {},
      });
    } else {
      res.json({
        success: false,
        data: {},
      });
    }
  } catch (error) {
    console.error("Error fetching reviews by property id:", error);
    next(error);
  }
};

// // Delete review by review id
export const delete_review_by_id: RequestHandler<
  { property_id: string; review_id: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { property_id, review_id } = req.params;
    const {
      tokenData: { _id: user_id },
    } = req;

    // Condition to check if check only review owner can delete review
    const reviewOwner = await Estate.findOne(
      {
        _id: property_id,
        "reviews._id": review_id,
        "reviews.by.user_id": user_id,
      },
      {
        "reviews.by.user_id": 1,
      }
    );
    if (!reviewOwner) {
      res.status(403).json({
        success: false,
        data: false,
      });
      return;
    }
    console.log(reviewOwner);
    // Update the property by removing the review with the given review_id and the review's by.user_id

    const result = await Estate.updateOne(
      {
        _id: property_id,
        "reviews._id": review_id,
        "reviews.by.user_id": user_id,
      },
      {
        $pull: {
          reviews: { _id: review_id, "by.user_id": user_id },
        },
      }
    );

    res.json({
      success: true,
      data: result.modifiedCount ? true : false,
    });
  } catch (error) {
    next(error);
  }
};

// Update review by review id
export const update_review: RequestHandler<
  { property_id: string; review_id: string },
  StandardResponse<number>,
  { review: string; rating: number },
  unknown
> = async (req, res, next) => {
  try {
    const { property_id, review_id } = req.params;
    const { review, rating } = req.body;
    const {
      tokenData: { _id: user_id },
    } = req;
    const review_details = await Estate.findOne(
      {
        _id: property_id,
        "reviews._id": review_id,
      },
      { "reviews.$": 1, _id: 0 }
    );
    console.log(review_details?.reviews[0].by?.user_id); //new ObjectId('6773370775476e85ce2672be')
    console.log(user_id); //6773370775476e85ce2672be
    const added_by_user_id = review_details?.reviews[0].by?.user_id;
    // console.log(added_by_user_id!.toString());
    if (added_by_user_id!.toString() !== user_id) {
      throw new ErrorWithStatus("Unauthorized access", 403);
    }
    const result = await Estate.updateOne(
      {
        _id: property_id,
        "reviews._id": review_id,
      },
      {
        $set: {
          "reviews.$.review": review,
          "reviews.$.rating": rating,
          "reviews.$.lastUpdated": Date.now(),
        },
      }
    );
    res.json({ success: true, data: result.modifiedCount });
  } catch (error) {
    console.error("Error updating review by review id:", error);
    next(error);
  }
};
