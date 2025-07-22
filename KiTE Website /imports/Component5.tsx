import imgRectangle42 from "figma:asset/57c93b60564991d0db7b7e0e3518836a3e4cdc49.png";

function Component5() {
  return (
    <div className="relative size-full" data-name="Component 5">
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
    </div>
  );
}

export default function Component6() {
  return (
    <div className="relative size-full" data-name="Component 5">
      <Component5 />
    </div>
  );
}