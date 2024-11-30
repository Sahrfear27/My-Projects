import { RequestHandler } from "express";
import { StandardResponse } from "../Helper/standardResponse";
import { User } from "../Users/user_model";
import { Estate, EstateType } from "./estate_model";

export const add_apartment: RequestHandler<
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
    console.log(req.file); // Check the file data

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
      images: [{ filename: "", originalname: "" }],
      propertyType,
      features,
      addedBy: {
        user_id: tokenData._id,
        fullname: tokenData.fullname,
        email: tokenData.email,
      },
      dateAdded: new Date(),
    };

    // Add images if uploaded
    if (req.file) {
      const { originalname, filename } = req.file;
      newApartmentData.images = [{ filename, originalname }];
    }

    // Create the new apartment entry
    const newApartment = await Estate.create(newApartmentData);

    // Respond with the created apartment data
    res.json({ success: true, data: newApartment });
  } catch (error) {
    next(error);
  }
};
