// import { Contact } from "../models/contact.js";
// import { HttpError } from "../helpers/index.js";

// const getAllContacts = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 20 } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Contact.find({ owner }, "", {
//     skip,
//     limit: Number(limit),
//   }).populate("owner", "name email");
//   res.json(result);
// };

// const getOneContact = async (req, res) => {
//   const { id } = req.params;
//   const { _id: owner } = req.user;
//   const result = await Contact.findOne({ _id: id })
//     .where("owner")
//     .equals(owner);
//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }
//   res.status(200).json(result);
// };

// const createContact = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Contact.create({ ...req.body, owner });
//   res.status(201).json(result);
// };

// const deleteContact = async (req, res) => {
//   const { id } = req.params;
//   const { _id: owner } = req.user;
//   const result = await Contact.findByIdAndDelete(id)
//     .where("owner")
//     .equals(owner);
//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }
//   res.json({ message: "Delete success" });
// };

// const updateContact = async (req, res) => {
//   const { id } = req.params;
//   const { _id: owner } = req.user;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
//     .where("owner")
//     .equals(owner);
//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }
//   res.json(result);
// };

// const updateFavorite = async (req, res) => {
//   const { id } = req.params;
//   const { _id: owner } = req.user;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
//     .where("owner")
//     .equals(owner);
//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }
//   res.json(result);
// };

// export const contactsControllers = {
//   getAllContacts,
//   getOneContact,
//   createContact,
//   deleteContact,
//   updateContact,
//   updateFavorite,
// };
