import type { ForgoNode } from "forgo";

import styles from "./text-hero.module.css";

type TextHeroProps = {
  heading?: ForgoNode;
  intro?: ForgoNode;
  content?: ForgoNode;
};

function TextHero(_: TextHeroProps) {
  return {
    render({ heading, intro, content }: TextHeroProps) {
      return (
        <section className={styles.hero}>
          {intro ? <p className={styles.intro}>{intro}</p> : ""}
          {heading ? <h1 className={styles.heading}>{heading}</h1> : ""}
          <div className={styles.content}>{content ? content : ""}</div>
        </section>
      );
    },
  };
}

export default TextHero;
