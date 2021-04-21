import express from "express";
import uniqid from "uniqid";
import sgMail from "@sendgrid/mail";

import dotenv from "dotenv";

dotenv.config();
import { getAttendees, writeAttendees } from "../lib/fs-tools.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const guests = await getAttendees();

    const newGuest = { ...req.body, id: uniqid(), addenOn: new Date() };

    guests.push(newGuest);

    await writeAttendees(guests);

    res.status(201).send("guest added to list");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/sendEmail", async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: "hsyncn17@gmail.com",
      from: "hsyncn17@gmail.com",
      subject: "is this working?!",
      text: "strive school",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    await sgMail.send(msg);
    res.send("sent");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
