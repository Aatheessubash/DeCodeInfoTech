import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useData } from "../../context/useData";
import styles from "./WhoWeAre.module.css";

export function WhoWeAre() {
  const { siteContent } = useData();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 56;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy} data-motion="rise">
            <h2 id="about-heading" className={styles.headline}>
              {siteContent?.aboutHeading ? (
                siteContent.aboutHeading.includes("what’s") || siteContent.aboutHeading.includes("what's") ? (
                  <>
                    Building<br />what’s <span>next.</span>
                  </>
                ) : (
                  siteContent.aboutHeading
                )
              ) : (
                <>
                  Building<br />what’s <span>next.</span>
                </>
              )}
            </h2>
            <p className={styles.lead}>
              {siteContent?.aboutLead || "We turn complex challenges into intelligent digital solutions."}
            </p>
            <div className={styles.description}>
              <p>
                {siteContent?.aboutDesc1 ||
                  "At DeCode InfoTech, we combine technology, strategy, and design to create scalable foundations for growth."}
              </p>
              <p>
                {siteContent?.aboutDesc2 ||
                  "Our solutions simplify operations, unlock new possibilities, and adapt to change — delivering lasting value that keeps your business moving forward."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollTo('services')}
              className={styles.link}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left' }}
            >
              <span>Explore our services</span>
              <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <figure className={styles.visual} data-motion="rise">
            <div className={styles.imageFrame}>
              <img
                src={siteContent?.aboutImage || "/assets/who-we-are.jpg"}
                alt={`${siteContent?.agencyName || 'DeCode InfoTech'} team collaborating in a modern office`}
                className={styles.image}
                loading="lazy"
              />
            </div>
            <figcaption className={styles.caption}>
              <ArrowUpRight size={18} strokeWidth={1.5} className={styles.captionMark} aria-hidden="true" />
              <p>
                {siteContent?.aboutCaption ? (
                  siteContent.aboutCaption.includes('.') ? (
                    <>
                      {siteContent.aboutCaption.split('.')[0]}.<br />
                      <span>{siteContent.aboutCaption.split('.').slice(1).join('.').trim()}</span>
                    </>
                  ) : (
                    siteContent.aboutCaption
                  )
                ) : (
                  <>
                    Built to evolve.<br />
                    <span>Designed for what’s next.</span>
                  </>
                )}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
