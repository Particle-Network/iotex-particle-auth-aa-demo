import React from "react";

const Header = () => {
  const headContent = {
    title: "Particle Auth Core + IoTeX Demo",
    metaDescription:
      "Particle Auth with Account Abstraction Code demo in Next JS for the IoTeX chain.",
    favicon: "/favicon.ico",
  };

  const mainHeadingContent = {
    particleLinkHref: "https://particle.network",
    particleImageSrc: "/dark.png",
    particleImageAlt: "Particle Logo",
    particleImageWidth: 240,
    particleImageHeight: 24,
    iotexLinkHref: "https://iotex.io",
    iotexImageSrc: "/iotex.png",
    iotexImageAlt: "IoTeX Logo",
    iotexImageWidth: 240,
    iotexImageHeight: 24,
  };

  const subHeading =
    "Particle Auth + Account Abstraction SDK + IoTex Chain demo.";

  return (
    <>
      <header>
        <title>{headContent.title}</title>
        <meta name="description" content={headContent.metaDescription} />
        <link rel="icon" href={headContent.favicon} />
      </header>
      <h1 className="text-4xl mt-4 font-bold mb-12 text-center flex items-center justify-center">
        <a
          href={mainHeadingContent.particleLinkHref}
          className="text-purple-400 hover:text-purple-300 transition duration-300 ml-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={mainHeadingContent.particleImageSrc}
            alt={mainHeadingContent.particleImageAlt}
            width={mainHeadingContent.particleImageWidth}
            height={mainHeadingContent.particleImageHeight}
          />
        </a>
        <a
          href={mainHeadingContent.iotexLinkHref}
          className="text-purple-400 hover:text-purple-300 transition duration-300 ml-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={mainHeadingContent.iotexImageSrc}
            alt={mainHeadingContent.iotexImageAlt}
            width={mainHeadingContent.iotexImageWidth}
            height={mainHeadingContent.iotexImageHeight}
          />
        </a>
      </h1>
      <h2 className="text-2xl font-bold mb-6">{subHeading}</h2>
    </>
  );
};

export default Header;
