import imgRectangle43 from "figma:asset/839da3fff0c437eed8ea51029303b18622c14dcd.png";

function Component4() {
  return (
    <div className="relative size-full" data-name="Component 4">
      <div
        className="[background-size:133.65%_117.18%] absolute bg-[11.01%_65.4%] bg-no-repeat inset-0"
        style={{ backgroundImage: `url('${imgRectangle43}')` }}
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

export default function Component5() {
  return (
    <div className="relative size-full" data-name="Component 4">
      <Component4 />
    </div>
  );
}