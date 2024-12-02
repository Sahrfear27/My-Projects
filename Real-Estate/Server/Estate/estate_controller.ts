import { RequestHandler } from "express";
import { StandardResponse } from "../Helper/standardResponse";
import { Estate, EstateType } from "./estate_model";

type Image = {
  filename: string;
  originalname: string;
};
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

    console.log(req.files);

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

export const get_apartmentby_id: RequestHandler<
  { apartment_id: string },
  StandardResponse<EstateType | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { apartment_id } = req.params;
    // console.log(apartment_id);
    const result = await Estate.findOne({
      _id: apartment_id,
    }).lean();
    console.log(result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
  }
};
