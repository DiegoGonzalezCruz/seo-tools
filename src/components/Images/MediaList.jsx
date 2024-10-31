import { useState } from 'react'
import ImageItem from './ImageItem'
import toast from 'react-hot-toast'
import { identifyAndUpdateAltTag } from '@/lib/openAI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const MediaList = ({ media }) => {
  const [checkedItems, setCheckedItems] = useState({})
  const [showOnlyMissingAlt, setShowOnlyMissingAlt] = useState(false)
  const queryClient = useQueryClient()

  // console.log(showOnlyMissingAlt, "showOnlyMissingAlt");
  // console.log(media, "media");

  // const batchUpdateAltTag = async (checkedItems) => {
  //   const ids = Object.keys(checkedItems);
  //   console.log(ids, "ids");
  //   toast.loading("Analyzing images...");
  //   const res = await Promise.all(
  //     ids.map(async (id) => {
  //       const mediaItem = media.images.find((image) => image.id === Number(id));
  //       if (mediaItem) {
  //         await identifyAndUpdateAltTag(mediaItem);
  //       }
  //     })
  //   );
  //   console.log(res, "res");
  //   toast.dismiss();
  //   queryClient.invalidateQueries({ queryKey: "media" });
  //   toast.success("All selected images analyzed successfully");
  // };
  const batchUpdateAltTagMutation = useMutation({
    mutationFn: async (checkedItems) => {
      const ids = Object.keys(checkedItems)
      console.log(ids, 'ids for batch updating')
      return await Promise.all(
        ids.map(async (id) => {
          const mediaItem = media.images.find(
            (image) => image.id === Number(id),
          )
          if (mediaItem) {
            const newAltTag = await identifyAndUpdateAltTag(mediaItem)
            return { id, newAltTag }
          }
          return null
        }),
      )
    },
    onMutate: () => {
      toast.loading('Analyzing images...')
    },
    onSuccess: (results) => {
      toast.dismiss()
      results.forEach((result) => {
        if (result) {
          // Here you would ideally update your cache if necessary
          queryClient.setQueryData(['media', result.id], (oldData) => {
            return { ...oldData, alt_text: result.newAltTag }
          })
        }
      })
      queryClient.invalidateQueries({ queryKey: 'media' })
      toast.success('All selected images analyzed successfully')
    },
    onError: (error) => {
      toast.dismiss()
      toast.error('Error while analyzing images: ' + error.message)
    },
  })

  const handleAllCheckboxes = (isChecked) => {
    if (isChecked) {
      const newCheckedItems = {}
      media.images.forEach((image) => {
        if (!showOnlyMissingAlt || !image.alt) {
          newCheckedItems[image.id] = true
        }
      })
      setCheckedItems(newCheckedItems)
    } else {
      setCheckedItems({})
    }
  }

  const handleCheckboxChange = (id, isChecked) => {
    setCheckedItems((prev) => {
      if (isChecked) {
        return {
          ...prev,
          [id]: true,
        }
      } else {
        const newState = { ...prev }
        delete newState[id]
        return newState
      }
    })
  }

  const filteredImages = showOnlyMissingAlt
    ? media.images.filter((image) => !image.alt_text)
    : media.images

  return (
    <div className=" w-full ">
      <div className="flex flex-row gap-5 items-center justify-center  my-5">
        <Button
          className="btn btn-primary btn-xs"
          onClick={() => batchUpdateAltTagMutation.mutate(checkedItems)}
        >
          Create Alt Tag
        </Button>
        <div className="form-control">
          <Label className="label cursor-pointer flex flex-row items-center  justify-center gap-2">
            <Input
              type="checkbox"
              defaultChecked={showOnlyMissingAlt}
              onClick={() => setShowOnlyMissingAlt((prev) => !prev)}
              className="w-5 h-5"
            />
            <span className="label-text">Toggle Missing Alt</span>
          </Label>
        </div>
      </div>
      <Table className="table  w-full">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Label>
                <Input
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => handleAllCheckboxes(e.target.checked)}
                />
              </Label>
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Alt Tag</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {filteredImages?.map((media) => (
            <ImageItem
              media={media}
              key={media.id}
              isChecked={checkedItems[media.id] || false}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MediaList
