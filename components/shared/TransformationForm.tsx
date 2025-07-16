"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
  compressionOptions,
  formatOptions,
} from "@/constants";
import { CustomField } from "./CustomField";
import { useEffect, useState, useTransition } from "react";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import MediaUploader from "./MediaUploader";
import TransformedImage from "./TransformedImage";
import { updateCredits } from "@/lib/actions/user.actions";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image.actions";
import { useRouter } from "next/navigation";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
  quality: z.string().optional(),
  format: z.string().optional(),
});

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isPending, startTransition] = useTransition();
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [transformedSize, setTransformedSize] = useState<number | null>(null);
  const router = useRouter();

  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
          quality: data?.quality || "auto:good",
          format: data?.format || "auto",
        }
      : defaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      };

      if (action === "Add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: "/",
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformations/${newImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id,
            },
            userId,
            path: `/transformations/${data._id}`,
          });

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false);
  }

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  const onCompressionChangeHandler = (
    fieldName: string,
    value: string,
    onChangeField: (value: string) => void
  ) => {
    setNewTransformation((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000)();

    return onChangeField(value);
  };

  const onTransformHandler = async () => {
    setIsTransforming(true);

    // Get original image size
    if (image?.secureURL && !originalSize) {
      try {
        const response = await fetch(image.secureURL, { method: "HEAD" });
        const size = parseInt(response.headers.get("content-length") || "0");
        setOriginalSize(size);
      } catch (error) {
        console.error("Error fetching original size:", error);
      }
    }

    const updatedConfig = deepMergeObjects(
      newTransformation,
      transformationConfig
    );
    setTransformationConfig(updatedConfig);

    setNewTransformation(null);

    startTransition(async () => {
      await updateCredits(userId, creditFee);
    });

    setIsTransforming(false);
  };

  // Function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Function to calculate compression ratio
  const getCompressionRatio = (): string => {
    if (!originalSize || !transformedSize) return "";
    const ratio = ((originalSize - transformedSize) / originalSize) * 100;
    return `${ratio.toFixed(1)}% reduction`;
  };

  useEffect(() => {
    if (
      image &&
      (type === "restore" ||
        type === "removeBackground" ||
        type === "crop" ||
        type === "compress")
    ) {
      setNewTransformation(transformationType.config);
    }
  }, [image, transformationType.config, type]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
        <CustomField
          control={form.control}
          name="title"
          formLabel={
            <span className="text-dark-600">
              Image Title <span className="text-red-500">*</span>
            </span>
          }
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  onSelectFieldHandler(value, field.onChange)
                }
                value={field.value}
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem key={key} value={key} className="select-item">
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "remove" ? "Object to remove" : "Object to recolor"
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) =>
                    onInputChangeHandler(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />

            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) =>
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        {(type === "compress" || type === "crop") && (
          <div className="compression-fields">
            <CustomField
              control={form.control}
              name="quality"
              formLabel="Quality Level"
              className="w-full"
              render={({ field }) => (
                <Select
                  onValueChange={(value) =>
                    onCompressionChangeHandler("quality", value, field.onChange)
                  }
                  value={field.value}
                >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(compressionOptions).map((key) => (
                      <SelectItem key={key} value={key} className="select-item">
                        <div className="flex flex-col">
                          <span>
                            {
                              compressionOptions[
                                key as keyof typeof compressionOptions
                              ].label
                            }
                          </span>
                          <span className="text-xs text-gray-500">
                            {
                              compressionOptions[
                                key as keyof typeof compressionOptions
                              ].description
                            }
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <CustomField
              control={form.control}
              name="format"
              formLabel="Output Format"
              className="w-full"
              render={({ field }) => (
                <Select
                  onValueChange={(value) =>
                    onCompressionChangeHandler("format", value, field.onChange)
                  }
                  value={field.value}
                >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(formatOptions).map((key) => (
                      <SelectItem key={key} value={key} className="select-item">
                        <div className="flex flex-col">
                          <span>
                            {
                              formatOptions[key as keyof typeof formatOptions]
                                .label
                            }
                          </span>
                          <span className="text-xs text-gray-500">
                            {
                              formatOptions[key as keyof typeof formatOptions]
                                .description
                            }
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        {/* File Size Information */}
        {(originalSize || transformedSize) && (
          <div className="file-size-info">
            <div className="size-comparison">
              {originalSize && (
                <div className="size-item">
                  <span className="size-label">Original Size:</span>
                  <span className="size-value">
                    {formatFileSize(originalSize)}
                  </span>
                </div>
              )}
              {transformedSize && (
                <div className="size-item">
                  <span className="size-label">Compressed Size:</span>
                  <span className="size-value">
                    {formatFileSize(transformedSize)}
                  </span>
                </div>
              )}
              {originalSize && transformedSize && (
                <div className="compression-ratio">
                  <span className="ratio-label">Compression:</span>
                  <span className="ratio-value">{getCompressionRatio()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
            onSizeCalculated={setTransformedSize}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="submit-button capitalize"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? "Transforming..." : "Apply Transformation"}
          </Button>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
