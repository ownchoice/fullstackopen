import React from "react";
import { useStateValue } from "../state";
import { assertNever, Entry } from "../types";
import { Icon, Card } from "semantic-ui-react";

interface Props {
  entries: Entry[];
}

const PatientEntries = ({ entries }: Props) => {
  const [{ diagnoses }, _dispatch] = useStateValue();

  // console.log(diagnoses);

  // https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
  const daysBetweenDates = (startDate: string, endDate: string) => {
    // Set two dates to two variables
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days;
  };

  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <>
            <Card.Content>
              <Icon name="stethoscope" size="big" className="right floated" />
              <Card.Header>{entry.date}</Card.Header>
              <Card.Meta>{entry.specialist}</Card.Meta>
              <Card.Description>{entry.description}</Card.Description>
            </Card.Content>
            <Card.Content>Rating: {entry.healthCheckRating}</Card.Content>
            {entry.diagnosisCodes && (
              <Card.Content>
                {entry.diagnosisCodes.map((code) => (
                  <React.Fragment key={code}>
                    {code}:{" "}
                    {diagnoses[code] ? diagnoses[code].name : "Name unknown"}
                    <br />
                  </React.Fragment>
                ))}
              </Card.Content>
            )}
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Card.Content>
              <Icon name="user md" size="big" className="right floated" />
              <Card.Header>{entry.date}</Card.Header>
              <Card.Meta>{entry.specialist}</Card.Meta>
              <Card.Description>{entry.description}</Card.Description>
            </Card.Content>
            <Card.Content>
              Employer: {entry.employerName}
              {entry.sickLeave && (
                <p>
                  Sick leave:{" "}
                  <strong>
                    {daysBetweenDates(
                      entry.sickLeave.startDate,
                      entry.sickLeave.endDate
                    )}{" "}
                    days
                  </strong>{" "}
                  (from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                  )
                </p>
              )}
            </Card.Content>
            {entry.diagnosisCodes && (
              <Card.Content>
                <p>
                  <strong>Diagnosis codes:</strong>
                </p>
                {entry.diagnosisCodes.map((code) => (
                  <React.Fragment key={code}>
                    {code}:{" "}
                    {diagnoses[code] ? diagnoses[code].name : "Name unknown"}
                    <br />
                  </React.Fragment>
                ))}
              </Card.Content>
            )}
          </>
        );
      case "Hospital":
        return (
          <>
            <Card.Content>
              <Icon name="heartbeat" size="big" className="right floated" />
              <Card.Header>{entry.date}</Card.Header>
              <Card.Meta>{entry.specialist}</Card.Meta>
              <Card.Description>{entry.description}</Card.Description>
            </Card.Content>
            <Card.Content>
              Discharged on {entry.discharge.date}{" "}
              <em>({entry.discharge.criteria})</em>
            </Card.Content>
            {entry.diagnosisCodes && (
              <Card.Content>
                {entry.diagnosisCodes.map((code) => (
                  <React.Fragment key={code}>
                    {code}:{" "}
                    {diagnoses[code] ? diagnoses[code].name : "Name unknown"}
                    <br />
                  </React.Fragment>
                ))}
              </Card.Content>
            )}
          </>
        );
      default:
        return assertNever(entry);
    }
  };
  return (
    <>
      <Card.Group>
        {entries.map((entry) => (
          <Card key={entry.id}>{renderEntry(entry)}</Card>
        ))}
      </Card.Group>
    </>
  );
};

export default PatientEntries;
