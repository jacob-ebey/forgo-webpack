import type { ForgoComponent, ForgoComponentProps } from "forgo";

import styles from "./resume.module.css";

type Experience = {
  company: string;
  department: string;
  title: string;
  overview: string;
  bullets: string[];
};

type Reference = {
  company: string;
  name: string;
  quote: string;
  title: string;
};

type ResumeProps = ForgoComponentProps & {
  email: string;
  experiences: Experience[];
  expertise: string[];
  location: string;
  name: string;
  references: Reference[];
  summary: string;
  title: string;
};

function Resume(_: ResumeProps) {
  return {
    render({
      email,
      experiences,
      expertise,
      location,
      name,
      references,
      summary,
      title,
    }: ResumeProps) {
      return (
        <div className={styles.resume}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.contact}>
            {title} <br /> {location} <br />{" "}
            <a href={`mailto:${email}`}>{email}</a>
          </p>

          <h2>Summary</h2>
          <p className={styles.summary}>{summary}</p>

          <h2>Expertise</h2>
          <ul className={styles.expertise}>
            {expertise.map((item) => (
              <li>{item}</li>
            ))}
          </ul>

          <h2>Experience</h2>
          <ul className={styles.experiences}>
            {experiences.map((experience) => (
              <li>
                <h3>
                  {experience.company} &mdash;{" "}
                  <span>
                    {experience.department} &mdash; {experience.title}
                  </span>
                </h3>
                <p>{experience.overview}</p>
                <ul>
                  {experience.bullets.map((bullet) => (
                    <li>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h2>References</h2>
          <ul className={styles.references}>
            {references.map((reference) => (
              <li>
                <figure>
                  <blockquote>
                    <span>{reference.quote}</span>
                  </blockquote>
                  <figcaption>
                    {reference.name} &mdash; {reference.title} &mdash;{" "}
                    {reference.company}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  };
}

export default Resume;
