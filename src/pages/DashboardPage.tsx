import { useEffect, useState } from "react";
import "./DashboardPage.css";
import colegio1 from "../assets/colegio-1.png";
import colegio2 from "../assets/colegio-2.png";
import colegio3 from "../assets/colegio-3.png";

const backgroundImages = [colegio1, colegio2, colegio3];

const marqueeItems = [
  { word: "Conocimiento", shape: "circle", color: "#3b5bdb" },
  { word: "Pensadores", shape: "triangle", color: "#37b24d" },
  { word: "Comunicación", shape: "square", color: "#f76707" },
  { word: "Principios", shape: "diamond", color: "#f2c500" },
  { word: "Cuidado", shape: "circle", color: "#e8590c" },
  { word: "Crecimiento", shape: "triangle", color: "#9c36b5" },
];

function DashboardPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % backgroundImages.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
    <section className="dashboard-hero">
      <div className="dashboard-slideshow" aria-hidden="true">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`dashboard-slide${index === activeSlide ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="dashboard-slideshow-overlay" />
      </div>

      <div className="dashboard-background-shape dashboard-shape-one" />
      <div className="dashboard-background-shape dashboard-shape-two" />

      <div className="dashboard-content">
        <div className="dashboard-text">
  <h1 className="hero-title">
    <span className="hero-title-white">Un colegio</span>

    <span className="hero-title-purple">
      <span className="underlined-phrase">por y para ellos</span>
    </span>
  </h1>

  <p className="hero-description">
    Gestiona alumnos, maestros, cursos y reportes desde un solo lugar.
  </p>
</div>
      </div>
    </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span className="marquee-item" key={`${item.word}-${index}`}>
              <span
                className={`marquee-shape marquee-shape-${item.shape}`}
                style={{ color: item.color }}
                aria-hidden="true"
              />
              <span className="marquee-word">{item.word}</span>
            </span>
          ))}
        </div>
      </div>

      <section className="why-section">
        <div className="why-inner">
          <div className="why-shapes" aria-hidden="true">
            <span className="why-shape why-shape-circle" />
            <span className="why-shape why-shape-triangle" />
            <span className="why-shape why-shape-square" />
          </div>

          <h2 className="why-title">Por qué elegir Escuela de Brasil</h2>

          <p className="why-text">
            Somos famosos por nuestros excelentes logros académicos, nuestras
            apreciadas tradiciones y las historias forjadas por generaciones de
            alumnos, padres, profesores y personal. Nuestro propósito es
            inspirar a cada niño a perseguir sus pasiones, luchar por la
            excelencia y lograr una vida plena.
          </p>
        </div>
      </section>
    </>
  );
}

export default DashboardPage;
