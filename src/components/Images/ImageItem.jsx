import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { identifyAndUpdateAltTag, updateAltTag } from "@/lib/llm";
import ModalDetails from "../Dashboard/ModalDetails";
import useUserData from "@/lib/hooks/useUserData";
import { Button } from "../ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Avatar, AvatarImage } from "../ui/avatar";
import { decode } from "html-entities";

const ImageItem = ({ media, isChecked, onCheckboxChange }) => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserData();
  // console.log(userData, 'userData from ImageItem 🍄 ************')

  const [showModal, setShowModal] = useState(false);

  const handleClickIdentifyImage = useMutation({
    mutationFn: async (media) => {
      if (!userData) {
        throw new Error("User data is not available");
      }

      const newAltTag = await identifyAndUpdateAltTag(media, userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("Image analyzed successfully");
    },
    onError: (error) => {
      toast.error("Error analyzing image: " + error.message);
    },
  });

  const handleOpenModal = () => {
    // console.log("open modal");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <TableRow className="">
      <TableCell>
        <Label>
          <Input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onCheckboxChange(media.id, e.target.checked)}
            className="checkbox"
          />
        </Label>
      </TableCell>
      <TableCell className="w-48">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              width={200}
              height={200}
              src={media.source_url}
              alt={media.alt_text}
              className="object-scale-down debug"
            />
          </Avatar>

          <div className="font-bold">
            {media.title.rendered ? decode(media.title.rendered) : "No Title"}
          </div>
        </div>
      </TableCell>
      <TableCell className="w-96">
        {media.alt_text ? media.alt_text : "No Alt Tag"}
      </TableCell>
      <TableCell className="flex flex-row gap-2 ">
        <Button
          className="btn btn-primary btn-xs"
          onClick={() => handleClickIdentifyImage.mutate(media)}
        >
          Create Alt Tag
        </Button>
        <ModalDetails
          isOpen={showModal}
          media={media}
          onClose={handleCloseModal}
        />
      </TableCell>
    </TableRow>
  );
};

export default ImageItem;
