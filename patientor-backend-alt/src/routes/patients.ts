import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.send(patientService.getPatients());
  res.send(patientService.getPatientsSensitive());
});

router.get("/:id", (req, res) => {
  // const patient = patientService.findById(req.params.id);
  const patient = patientService.findByIdSensitive(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.get("/:id/entries", (req, res) => {
  const patient = patientService.findByIdSensitive(req.params.id);

  if (patient) {
    res.send(patient.entries);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const patientWithAddedEntry = patientService.addPatientEntry(
      req.params.id,
      newPatientEntry
    );
    res.json(patientWithAddedEntry);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
