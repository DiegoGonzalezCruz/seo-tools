"use client";
import useUserData from "@/lib/hooks/useUserData";
import {
  backupOldImage,
  convertAndUploadImage,
  convertImage,
  getMediaById,
  replaceImageInWordPress,
  saveImage,
  uploadImage,
} from "@/lib/wordpress";
import { decode } from "html-entities";
import React from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

const MediaListings = ({ media, page }) => {
  // console.log(media, 'media')
  // console.log(page, 'page')
  const { data: userData } = useUserData();
  // console.log(userData, 'userData')
  const handleUpgradeImage = async (mediaObject) => {
    toast.promise(
      (async () => {
        // Convert the image to WebP
        const { fullFilename, webpBase64 } = await convertImage(
          mediaObject,
          userData
        );

        // Upload the new WebP image and return the result
        return await saveImage(webpBase64, fullFilename, page.slug);
      })(),
      {
        loading: "Upgrading image...",
        success: "Image upgraded successfully!",
        error: "Failed to upgrade image.",
      }
    );
  };

  return (
    <div className=" flex flex-wrap gap-5">
      {media.map((item, index) => {
        // console.log(item, 'item')
        return (
          <Card
            key={item.source_url + index + item.id}
            className="card bg-base-100 w-96 shadow-xl"
          >
            <CardHeader>
              <figure>
                <img
                  src={item.source_url}
                  alt={item.alt_text}
                  width={150}
                  height={150}
                />
              </figure>
            </CardHeader>
            <CardContent className="card-body ">
              <h2 className="card-title break-all ">
                {decode(item?.title?.rendered)}
              </h2>
              <h2 className="card-title break-all ">{item.source_url}</h2>
              <p>Media Type: {item.mime_type}</p>
              <p>ID: {item.id}</p>
              {/* <div
                dangerouslySetInnerHTML={{ __html: item.description.rendered }}
              /> */}
            </CardContent>
            <CardFooter className="card-actions justify-end">
              <Button
                className="btn btn-primary"
                onClick={() => handleUpgradeImage(item)}
              >
                Upgrade Image
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default MediaListings;
