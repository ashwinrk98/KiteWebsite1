import imgRectangle42 from "figma:asset/57c93b60564991d0db7b7e0e3518836a3e4cdc49.png";

export default function Component3() {
  return (
    <div className="relative size-full" data-name="Component 3">
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-0"
        style={{ backgroundImage: `url('${imgRectangle42}')` }}
      />
      <div className="absolute bottom-0 left-0 right-[47.947%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 3588 9023"
        >
          <path
            d="M0 0H3588V9023H0V0Z"
            fill="var(--fill-0, black)"
            id="Rectangle 50"
            opacity="0.7"
          />
        </svg>
      </div>
      <div className="absolute bottom-[44.265%] font-['Sansation:Regular',_sans-serif] leading-[0] left-[5.498%] not-italic right-[50.646%] text-[#fff5f5] text-[300px] text-right top-[51.89%]">
        <p className="block leading-[normal]">Performance Focused</p>
      </div>
      <div className="absolute bottom-[13.022%] font-['Sansation_Light:Light',_sans-serif] leading-[normal] left-[1.451%] not-italic right-[51.023%] text-[#ffffff] text-[300px] text-right top-[60.911%]">
        <p className="block mb-0">
          Designed for athletes, fitness enthusiasts, and anyone who wants an
          everyday living who demands nothing but the best in nutrition
        </p>
        <p className="block">&nbsp;</p>
      </div>
    </div>
  );
}