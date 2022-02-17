import styles from "./servicess.module.scss"
import React from "react"

export default function servicess() {
  return (
    <div className={styles.container}>
      <div className={styles.serviceContainer}>
        <div className={styles.service}>
          <header>Enterprise Software Development</header>
          <p>
            Företagsappar i världsklass för att effektivisera ditt komplexa
            företag process & arbetsflöden.
          </p>
          <button className="noselect">Läs mer</button>
          <span>
            <a href="#"></a>
          </span>
        </div>
        <div className={styles.service}>
          <header>Futuristiska webblösningar</header>
          <p>
            Spetsteknologi för webblösningar för att leverera utmärkt robusta
            webbplatser och portaler
          </p>
          <button className="noselect">Läs mer</button>
        </div>
        <div className={styles.service}>
          <header>Mobil applikations utveckling</header>
          <p>
            Förstklassiga plattformsoberoende mobilappar för konsumentnära och
            företagsmiljöer.
          </p>
          <button className="noselect">Läs mer</button>
        </div>
      </div>
    </div>
  )
}
