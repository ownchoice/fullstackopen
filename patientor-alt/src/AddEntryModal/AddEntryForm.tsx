import React from "react";
import { Grid, Button, Form as UiForm } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import {
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
  isValidDate,
  assertNever,
  BaseEntryWithoutId,
} from "../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

// structure of a single option
export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health check" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
  { value: EntryType.Hospital, label: "Hospital" },
];

type EntryTypeSelectFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SelectField = ({
  name,
  label,
  options,
  onChange,
}: EntryTypeSelectFieldProps) => (
  <UiForm.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown" onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </UiForm.Field>
);

export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
};

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { label: "Healthy", value: HealthCheckRating.Healthy },
  { label: "Low risk", value: HealthCheckRating.LowRisk },
  { label: "High risk", value: HealthCheckRating.HighRisk },
  { label: "Critical risk", value: HealthCheckRating.CriticalRisk },
];

type HealthCheckRatingSelectFieldProps = {
  name: string;
  label: string;
  options: HealthCheckRatingOption[];
};

export const HealthCheckRatingSelectField = ({
  name,
  label,
  options,
}: HealthCheckRatingSelectFieldProps) => (
  <UiForm.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </UiForm.Field>
);

export const AddEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [sickLeaveBool, setSickLeaveBool] = React.useState<boolean>(false);

  const [entryType, setEntryType] = React.useState<EntryType>(
    EntryType.HealthCheck
  );

  const [baseValues, setBaseValues] = React.useState<BaseEntryWithoutId>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  });

  let initialValues: EntryWithoutId;
  switch (entryType) {
    case EntryType.HealthCheck:
      initialValues = {
        ...baseValues,
        type: entryType,
        healthCheckRating: 0,
      };
      break;

    case EntryType.Hospital:
      initialValues = {
        ...baseValues,
        type: entryType,
        discharge: {
          date: "",
          criteria: "",
        },
      };
      break;

    case EntryType.OccupationalHealthcare:
      initialValues = {
        ...baseValues,
        type: entryType,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      };
      break;

    default:
      return assertNever(entryType);
  }

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid format for date";
        const errors: {
          [field: string]:
            | string
            | {
                startDate?: string;
                endDate?: string;
              };
        } = {};
        // const errors: any = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValidDate(values.date)) {
          errors.date = invalidDateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (
            values.sickLeave &&
            (values.sickLeave.startDate !== "" ||
              values.sickLeave.endDate !== "")
          ) {
            let sickLeaveValid = true;
            const sickLeaveError: {
              startDate?: string;
              endDate?: string;
            } = {};

            if (!values.sickLeave.startDate) {
              sickLeaveError.startDate = requiredError;
              sickLeaveValid = false;
            } else {
              if (!isValidDate(values.sickLeave.startDate)) {
                sickLeaveError.startDate = invalidDateError;
                sickLeaveValid = false;
              }
            }

            if (!values.sickLeave.endDate) {
              sickLeaveError.endDate = requiredError;
              sickLeaveValid = false;
            } else {
              if (!isValidDate(values.sickLeave.endDate)) {
                sickLeaveError.endDate = invalidDateError;
                sickLeaveValid = false;
              }
            }

            if (!sickLeaveValid) {
              errors.sickLeave = sickLeaveError;
            }
          }
        }
        return errors;
      }}
    >
      {({
        // validateForm,
        values,
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
              onChange={(e) => {
                setEntryType(e.target.value as EntryType);
                setBaseValues({
                  description: values.description,
                  date: values.date,
                  specialist: values.specialist,
                  diagnosisCodes: values.diagnosisCodes,
                });
              }}
            />
            {values.type === EntryType.HealthCheck ? (
              <HealthCheckRatingSelectField
                label="Health check rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            ) : values.type === EntryType.OccupationalHealthcare ? (
              <>
                <Field
                  label="Employer"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <div id="my-radio-group">Sick leave</div>
                <UiForm.Group
                  role="group"
                  grouped
                  aria-labelledby="my-radio-group"
                >
                  <Field
                    label="Yes"
                    type="radio"
                    value="yes"
                    checked={sickLeaveBool}
                    component={UiForm.Radio}
                    onChange={() =>
                      // I couldn't get it to validate after updating this boolean  ¯\_(ツ)_/¯
                      // The validation occurs using the previous state
                      setSickLeaveBool(true)
                    }
                  />
                  <Field
                    label="No"
                    type="radio"
                    value="no"
                    checked={!sickLeaveBool}
                    component={UiForm.Radio}
                    onChange={() =>
                      // I couldn't get it to validate after updating this boolean  ¯\_(ツ)_/¯
                      // The validation occurs using the previous state
                      setSickLeaveBool(false)
                    }
                  />
                </UiForm.Group>
                {sickLeaveBool && (
                  <>
                    <Field
                      label="Start date"
                      placeholder="YYYY-MM-DD"
                      name="sickLeave.startDate"
                      component={TextField}
                    />
                    <Field
                      label="End date"
                      placeholder="YYYY-MM-DD"
                      name="sickLeave.endDate"
                      component={TextField}
                    />
                  </>
                )}
              </>
            ) : (
              <p>Hospital</p>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
