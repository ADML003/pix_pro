"use client";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
  onSizeCalculated,
}: TransformedImageProps) => {
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title
    );
  };

  const handleImageLoad = async (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (onSizeCalculated) {
      try {
        const transformedUrl = getCldImageUrl({
          width: image?.width,
          height: image?.height,
          src: image?.publicId,
          ...transformationConfig,
        });

        const response = await fetch(transformedUrl, { method: "HEAD" });
        const size = parseInt(response.headers.get("content-length") || "0");
        onSizeCalculated(size);
      } catch (error) {
        console.error("Error calculating transformed size:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">Transformed</h3>

        {hasDownload &&
          image?.publicId &&
          transformationConfig &&
          !isTransforming && (
            <button
              className="download-btn"
              onClick={downloadHandler}
              title="Download image"
            >
              Download
            </button>
          )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={(e) => {
              setIsTransforming && setIsTransforming(false);
              handleImageLoad(e);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
                className="icon-general"
              />
              <p className="text-white/80">Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Transformed Image</div>
      )}
    </div>
  );
};

export default TransformedImage;
