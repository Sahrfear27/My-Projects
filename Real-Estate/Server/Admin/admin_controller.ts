// Get all properties (inluding pending, approved, and rejected)

import { RequestHandler } from "express";
import { StandardResponse } from "../Helper/standardResponse";
import { Estate, EstateType } from "../Estate/estate_model";
import exp from "constants";
import multer from "multer";

const upload = multer();
export const get_all_properties: RequestHandler<
  unknown,
  StandardResponse<EstateType[] | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  const properties = await Estate.find().lean();
  res.json({ success: true, data: properties });

  try {
  } catch (error) {
    console.log("Error fetching all properties", error);
  }
};

// Route to Approve/Reject an Estate
// Once the admin views the estate, they can approve or reject it. To implement this, you can create an API endpoint to update the status of the estate.

export const approve_reject_estate: RequestHandler<
  { property_id: string },
  StandardResponse<EstateType | null>,
  { status: string },
  unknown
> = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const { status } = req.body;

    console.log("Request Body", status);
    // Validate status
    const validStatus = ["approved", "rejected"];
    if (!validStatus.includes(status)) {
      res.status(400).json({
        success: false,
        data: null,
      });
    }

    // Only admin can approve/reject an estate
    if (req.tokenData.role !== "admin") {
      res.status(403).json({
        success: false,
        data: null,
      });
      throw new Error("Only admin can approve/reject an estate");
    }

    // Update the status of the estate
    const estate = await Estate.findByIdAndUpdate(
      property_id,
      { status: status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: estate,
    });
  } catch (error) {
    console.error("Error approving/rejecting estate:", error);
  }
};
