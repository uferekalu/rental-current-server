const express = require("express");
const router = express.Router();
const Rent = require("../../models/Rent");
const jwt = require("jsonwebtoken");

const validateRentalInput = require("../../validation/rentals");

// get all info
router.get("/rents", async (req, res) => {
  try {
    const rents = await Rent.find();
    return res.status(200).json(rents);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// get a rent info
router.get("/rents/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const rent = await Rent.findOne({ _id });
    if (!rent) {
      return res.status(404).json({ msg: "Rent not found"});
    } else {
      return res.status(200).json(rent);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// create rental request
router.post("/rents", async (req, res) => {
  try {
    // Form Validation
    const { errors, isValid } = validateRentalInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { authorization } = req.headers;
    const token = authorization
      ? authorization.split("Bearer ").length
        ? authorization.split("Bearer ")[1]
        : null
      : null;
    console.log(token);
    if (token) {
      //verify token
      const user = jwt.verify(token, process.env.secretOrKey);
      if (user) {
        const {
          accomodationStatus,
          rentRequestAmount,
          monthlySalary,
          monthlyPaymentPlan,
          preapprovedAmount,
          monthlyPayment,
          tenor
        } = req.body;
        const createdBy = user.id;
        const rent = await Rent.create({
          user: createdBy,
          accomodationStatus,
          rentRequestAmount,
          monthlySalary,
          monthlyPaymentPlan,
          preapprovedAmount,
          monthlyPayment,
          tenor,
          createdBy
        });
        return res.status(201).json(rent);
      } else {
        return res.status(500).json({ error: "Verification failed!" });
      }
    } else {
      return res.status(500).json({ error: "Token not found!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/rents/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const {
      accomodationStatus,
      rentRequestAmount,
      monthlySalary,
      monthlyPaymentPlan,
      preapprovedAmount,
      monthlyPayment,
      tenor
    } = req.body;
    let rent_exist = await Rent.findOne({ _id });

    const { authorization } = req.headers;
    const token = authorization
      ? authorization.split("Bearer ").length
        ? authorization.split("Bearer ")[1]
        : null
      : null;
    console.log(token);
    if (token) {
      // Verify with token
      const user = jwt.verify(token, process.env.secretOrKey);
      if (user) {
        const createdBy = user.id;
        if (!rent_exist) {
          rent_exist = await Rent.create({
            user: createdBy,
            accomodationStatus,
            rentRequestAmount,
            monthlySalary,
            monthlyPaymentPlan,
            preapprovedAmount,
            monthlyPayment,
            tenor,
            createdBy
          });
          return res.status(201).json(rent_exist);
        } else {
          (rent_exist.accomodationStatus = accomodationStatus), (rent_exist.rentRequestAmount = rentRequestAmount), (rent_exist.monthlySalary = monthlySalary), (rent_exist.monthlyPaymentPlan = monthlyPaymentPlan), (rent_exist.preapprovedAmount = preapprovedAmount), (rent_exist.monthlyPayment = monthlyPayment), (rent_exist.tenor = tenor);
          await rent_exist.save();
          return res.status(200).json(rent_exist);
        }
      } else {
        return res.status(500).json({ error: "Verification failed!" });
      }
    } else {
      return res.status(500).json({ error: "Token not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
