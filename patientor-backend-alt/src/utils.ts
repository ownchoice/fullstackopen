import {
  NewPatient,
  Gender,
  Entry,
  EntryWithoutId,
  EntryType,
  EntryTypes,
  Diagnosis,
  assertNever,
  BaseEntryWithoutId,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }

  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return EntryTypes.includes(param);
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error("Incorrect or missing entry type: " + entryType);
  }
  return entryType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArrayOfStrings = (param: any): param is Array<string> => {
  return Array.isArray(param) && param.every((elem) => isString(elem));
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> | undefined => {
  if (!diagnosisCodes) {
    return undefined;
  } else {
    if (!isArrayOfStrings(diagnosisCodes)) {
      throw new Error("Incorrect list of diagnosis codes: " + diagnosisCodes);
    }
    return diagnosisCodes;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing health check rating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

interface EntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
  discharge?: {
    date: unknown;
    criteria: unknown;
  };
}

export const toNewPatientEntry = (object: EntryFields): EntryWithoutId => {
  const description = parseString(object.description, "description");
  const date = parseDate(object.date);
  const specialist = parseString(object.specialist, "specialist");
  const type = parseEntryType(object.type);
  const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);

  const newEntry: BaseEntryWithoutId = {
    description,
    date,
    specialist,
  };

  if (diagnosisCodes) {
    newEntry.diagnosisCodes = diagnosisCodes;
  }

  switch (type) {
    case "HealthCheck":
      return {
        ...newEntry,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "OccupationalHealthcare":
      const placeholderEntry: EntryWithoutId = {
        ...newEntry,
        type,
        employerName: parseString(object.employerName, "employerName"),
      };

      if (object.sickLeave) {
        placeholderEntry.sickLeave = {
          startDate: parseDate(object.sickLeave?.startDate),
          endDate: parseDate(object.sickLeave?.endDate),
        };
      }

      return placeholderEntry;
    case "Hospital":
      return {
        ...newEntry,
        type,
        discharge: {
          date: parseDate(object.discharge?.date),
          criteria: parseString(
            object.discharge?.criteria,
            "discharge criteria"
          ),
        },
      };
    default:
      return assertNever(type);
  }
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("Incorrect or missing patient entries");
  }

  return entries.map((entry) => ({
    ...toNewPatientEntry(entry),
    id: parseString(entry.id, "entry id"),
  }));
};

interface PatientFields {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
}

export const toNewPatient = (object: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
    entries: parseEntries(object.entries),
  };

  return newPatient;
};
