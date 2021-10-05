import React from "react";
import { Grid, Button, Form as UiForm } from "semantic-ui-react";
import {
  Field,
  Formik,
  Form,
  // FormikProps
} from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import {
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
  isValidDate,
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
  { value: "HealthCheck", label: "Health check" },
  { value: "OccupationalHealthcare", label: "Occupational healthcare" },
  { value: "Hospital", label: "Hospital" },
];

type EntryTypeSelectFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
};

export const SelectField = ({
  name,
  label,
  options,
}: EntryTypeSelectFieldProps) => (
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

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [sickLeaveBool, setSickLeaveBool] = React.useState<boolean>(false);

  // const handleChangeSickLeave = (
  //   value: boolean,
  //   setFieldValue: FormikProps<{
  //     "sickLeave.startDate": string;
  //     "sickLeave.endDate": string;
  //   }>["setFieldValue"]
  // ): void => {
  //   switch (value) {
  //     case "yes":
  //       setSickLeaveBool(true);
  //       setFieldValue
  //       break;
  //     case "no":
  //       setSickLeaveBool(false);
  //       break;
  //     default:
  //       assertNever(value);
  //   }
  // };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: 0,
      }}
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
        }
        if (values.date && !isValidDate(values.date)) {
          errors.date = invalidDateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "OccupationalHealthcare") {
          if (sickLeaveBool) {
            errors.sickLeave = {};
            if (!values.sickLeave?.startDate) {
              errors.sickLeave.startDate = requiredError;
              // console.log(requiredError);
            } else {
              if (!isValidDate(values.sickLeave.startDate)) {
                errors.sickLeave.startDate = invalidDateError;
                // console.log(invalidDateError);
              }
            }
            if (!values.sickLeave?.endDate) {
              errors.sickLeave.endDate = requiredError;
            } else {
              if (!isValidDate(values.sickLeave.endDate)) {
                errors.sickLeave.endDate = invalidDateError;
              }
            }
          }
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
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
            />
            {values.type === "HealthCheck" ? (
              <HealthCheckRatingSelectField
                label="Health check rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            ) : values.type === "OccupationalHealthcare" ? (
              <>
                {/* FOR LATER */}
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
                    checked={sickLeaveBool}
                    component={UiForm.Radio}
                    onChange={() => {
                      setSickLeaveBool(true);
                      setFieldValue("sickLeave", {
                        startDate: "",
                        endDate: "",
                      });
                    }}
                  />
                  <Field
                    label="No"
                    type="radio"
                    checked={!sickLeaveBool}
                    component={UiForm.Radio}
                    onChange={() => {
                      setSickLeaveBool(false);
                      setFieldValue("sickLeave", undefined);
                    }}
                  />
                  <div>Picked: {sickLeaveBool ? "Yes" : "No"}</div>
                </UiForm.Group>
                {sickLeaveBool && (
                  <>
                    <Field
                      label="Start date"
                      placeholder="YYYY-MM-DD"
                      name="sickLeave.startDate"
                      type="radio"
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
