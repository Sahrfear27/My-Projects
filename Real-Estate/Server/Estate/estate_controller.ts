import { RequestHandler } from "express";
import { StandardResponse } from "../Helper/standardResponse";
import { DEFAULT_PICTURE, Estate, EstateType } from "./estate_model";
import { ErrorWithStatus } from "../Helper/errorhandler";
import fs from "fs";
import path from "path";
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
      propertyType,
      features,
    } = req.body;

    // console.log(req.files);

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

// Update
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

    // Ensure only the user who added the property can modify it
    const existingProperty = await Estate.findOne({
      _id: property_id,
      "addedBy.user_id": tokenData._id,
    });

    if (!existingProperty) {
      throw new ErrorWithStatus(
        "Property not found or unauthorized access",
        403
      );
    }

    // Handle New Images if modified
    if (req.files && Array.isArray(req.files)) {
      const files = req.files as Express.Multer.File[];
      // Map and convert each file object into a Mongoose-compatible object
      const imageDocs = files.map((file) => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      }));

      // Use `push` to add each image document to the existing array
      existingProperty.images.push(...imageDocs);
    }
    // console.log(existingProperty);
    Object.assign(existingProperty, updatedField);

    // Update the last updated with the current date
    updatedField.lastUpdated = new Date();

    const result = await Estate.updateOne(
      { _id: property_id },
      { $set: existingProperty }
    );
    if (result.modifiedCount == 0) {
      res.json({ success: false, data: 0 });
    }
    res.json({ success: true, data: result.modifiedCount });
  } catch (error) {
    console.log(error);
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

export const apartments: RequestHandler<
  unknown,
  StandardResponse<EstateType[] | null>,
  unknown,
  { page?: string; limit?: string }
> = async (req, res, next) => {
  try {
    const { page = "1", limit = "10" } = req.query;
    const apartments = await Estate.find({ propertyType: "apartment" })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    if (!apartments || apartments.length == 0) {
      res.json({ success: false, data: null });
    }

    res.json({ success: true, data: apartments });
    console.log(apartments);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    next(error);
  }
};

export const houses: RequestHandler<
  unknown,
  StandardResponse<EstateType[] | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    // fetch all the property from the database
    const houses = await Estate.find({ propertyType: "house" }).lean();
    if (!houses || houses.length == 0) {
      res.json({ success: false, data: null });
    }
    res.json({ success: true, data: houses });
    console.log(houses);
  } catch (error) {
    console.error("Error occur fetching the apartmet", error);
  }
};

export const commercials: RequestHandler<
  unknown,
  StandardResponse<EstateType[] | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    // fetch all the property from the database
    const commercials = await Estate.find({
      propertyType: "commercial",
    }).lean();
    if (!commercials || commercials.length == 0) {
      res.json({ success: false, data: null });
    }
    res.json({ success: true, data: commercials });
    console.log(commercials);
  } catch (error) {
    console.error("Error occur fetching the apartmet", error);
  }
};

export const Villas: RequestHandler<
  unknown,
  StandardResponse<EstateType[] | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    // fetch all the property from the database
    const villas = await Estate.find({ propertyType: "villa" }).lean();
    if (!villas || Villas.length == 0) {
      res.json({ success: false, data: null });
    }
    res.json({ success: true, data: villas });
    console.log(villas);
  } catch (error) {
    console.error("Error occur fetching the apartmet", error);
  }
};
