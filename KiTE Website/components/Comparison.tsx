import exampleImage from 'figma:asset/d0d1ade6cd19537b09fe3b405418044d5a1a1ab0.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Comparison() {
  return (
    <section className="comparison-section-simple">
      <div className="comparison-container-simple">
        {/* Main Content */}
        <div className="comparison-content-simple">
          {/* Title */}
          <div className="comparison-title-simple">
            <h2>More protein,</h2>
            <h2>less calories.</h2>
          </div>

          {/* Comparison Image */}
          <div className="comparison-image-container">
            <ImageWithFallback
              src={exampleImage}
              alt="Protein Comparison Chart showing KiTE Nutrition vs The whole Truth, MAX PROTEIN, and Yoga Bar with superior nutritional values"
              className="comparison-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}