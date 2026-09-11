import React from "react";
import styles from "./WhoWeAre.module.css";

export function WhoWeAre() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 id="about-heading" className={styles.headline}>
              Building<br />what’s <span>next.</span>
            </h2>
            <p className={styles.lead}>
              We turn complex challenges into intelligent digital solutions.
            </p>
            <div className={styles.description}>
              <p>
                At DeCode InfoTech, we combine technology, strategy, and design
                to create scalable foundations for growth.
              </p>
              <p>
                Our solutions simplify operations, unlock new possibilities, and
                adapt to change — delivering lasting value that keeps your
                business moving forward.
              </p>
            </div>
            <a href="#services" className={styles.link}>
              Explore our services <span aria-hidden="true">↗</span>
            </a>
          </div>

          <figure className={styles.visual}>
            <div className={styles.imageFrame}>
              <img
                src="/assets/who-we-are.jpg"
                alt="DeCode InfoTech team collaborating in a modern office"
                className={styles.image}
                loading="lazy"
              />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.captionMark} aria-hidden="true">↗</span>
              <p>Built to evolve.<br /><span>Designed for what’s next.</span></p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
