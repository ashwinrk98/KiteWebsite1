import imgRectangle43 from "figma:asset/839da3fff0c437eed8ea51029303b18622c14dcd.png";
import imgRectangle42 from "figma:asset/57c93b60564991d0db7b7e0e3518836a3e4cdc49.png";
import kitchenSceneImage from "figma:asset/21d2ef31a125fe1370656beec72e3728f2bb309c.png";
import Rectangle50 from "../imports/Rectangle50";

export default function Work() {
  return (
    <div className="relative h-[200vh] w-full bg-black/90">
      {/* First Image - Left top, left half (0-100vh) */}
      <div className="absolute top-0 left-0 w-1/2 h-screen">
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url('${imgRectangle43}')` }}
        >
          {/* Black overlay on left half */}
          <div className="absolute top-0 left-0 w-1/2 h-full min-w-[175">
            <Rectangle50 />
            {/* Text overlay on black section - First image text - LEFT ALIGNED */}
            <div className="absolute inset-0 flex flex-col items-start justify-center p-6 text-white min-w-[175px]">
              <h3 className="chewy-heading text-xl md:text-2xl lg:text-3xl mb-3 text-white text-left whitespace-nowrap">
                Looking to lose weight?
              </h3>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-200 text-justify">
                The high fiber and protein content keeps you fuller and satisfied for longer, while keeping the calories in check.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Image - Right center, right half (starts at 50vh - center of first image) */}
      <div className="absolute top-[50vh] right-0 w-1/2 h-screen">
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url('${imgRectangle42}')` }}
        >
          {/* Black overlay on left half */}
          <div className="absolute top-0 left-0 w-1/2 h-full min-w-[175px]">
            <Rectangle50 />
            {/* Text overlay on black section - Second image text - LEFT ALIGNED */}
            <div className="absolute inset-0 flex flex-col items-start justify-center p-6 text-white">
              <h3 className="chewy-heading text-xl md:text-2xl lg:text-3xl mb-3 text-white text-left whitespace-nowrap">
                Performance Focused
              </h3>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-200 text-justify">
                Designed for athletes, fitness enthusiasts, and anyone who wants an everyday healthy living who demands nothing but the best in nutrition
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Image - Left center, left half (starts at 100vh - center of second image) */}
      <div className="absolute top-[100vh] left-0 w-1/2 h-screen">
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url('${kitchenSceneImage}')` }}
        >
          {/* Black overlay on left half */}
          <div className="absolute top-0 left-0 w-1/2 h-full min-w-[175px]">
            <Rectangle50 />
            {/* Text overlay on black section - Third image text - LEFT ALIGNED */}
            <div className="absolute inset-0 flex flex-col items-start justify-center p-6 text-white">
              <h3 className="chewy-heading text-xl md:text-2xl lg:text-3xl mb-3 text-white text-left whitespace-nowrap">
                Home-Crafted
              </h3>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-200 text-justify">
                Every kite bar is home-made, made proudly upholding the highest standards, packed with a lot of protein, and finished with love
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}