import React from "react";
import Modal from "../Modals/Modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { decode } from "html-entities";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const ModalDetails = ({ media, isOpen, onClose }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="btn btn-ghost btn-xs">
          details
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] md:max-w-xl"
        aria-describedby="dialog-description"
      >
        <DialogTitle className="debug">Media Details</DialogTitle>
        <DialogHeader>
          <DialogDescription>
            These are the details of the media item
          </DialogDescription>
        </DialogHeader>
        <div className=" gap-4 py-4 w-full flex flex-col items-center justify-center">
          <img
            src={media.source_url}
            alt={media.alt_text}
            className="w-96 h-96 object-scale-down"
            width={200}
            height={200}
          />
          <h3 className="text-lg">
            <span className="font-bold">Title: </span>{" "}
            {decode(media.title.rendered)}
          </h3>
          <p className="py-4">
            <span className="font-bold">Alt Tag: </span>
            {!media.alt_text ? (
              <span className="badge badge-error">No alt tag</span>
            ) : (
              media.alt_text
            )}
          </p>
          <p className="py-4 w-full text-sm">
            <span className="font-bold">URL: </span>
            {media.source_url}
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetails;
