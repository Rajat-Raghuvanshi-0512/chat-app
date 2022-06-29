import React, { useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { useModal } from '../../../../misc/custom-hooks'
import Modal from '../../../Modal'
import ImageUploading from 'react-images-uploading';
import { MdEdit, MdDelete } from "react-icons/md"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../misc/firebase';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import Loader from '../../../Loader/Loader';

const UploadFileModal = ({ afterUpload }) => {
  const { roomId } = useParams()

  const max = 5
  const [images, setImages] = useState([]);
  const { isOpen, openModal, closeModal } = useModal()
  const [loading, setLoading] = useState(false)


  const handleSubmit = async () => {
    if (images.length === 0) return
    try {
      setLoading(true)

      const uploadPromises = images.map(async img => {
        const blob = await (await fetch(img.data_url)).blob();
        const name = img.file.name
        const storageRef = ref(storage, `chat/${roomId}/${name}-${Date.now()}`)
        return uploadBytes(storageRef, blob, {
          cacheControl: `public, max-age=${3600 * 24 * 3}`
        })
      })

      const uploadSnaps = await Promise.all(uploadPromises)

      const shapePromises = uploadSnaps.map(async (snap) => {
        console.log(snap);
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name.split("-")[0],
          url: await getDownloadURL(snap.ref),
          id: snap.metadata.name
        }
      })

      const files = await Promise.all(shapePromises);

      await afterUpload(files)

      setImages(() => [])
      setLoading(false)
      closeModal()
    } catch (error) {
      toast.error(error)
      setLoading(false)
    }
  }

  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
  };
  return (
    <>
      <BsFillImageFill className='w-5 h-5 ml-2 cursor-pointer text-slate-700' onClick={openModal} />
      <Modal isOpen={isOpen} title="Upload File" closeModal={closeModal} closeText="Cancel" submitText={"Upload"} onClick={handleSubmit} >
        <div className='p-5'>
          {loading ? <Loader /> :
            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={max}
              multiple
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors
              }) => (
                // write your building UI
                <div>
                  {images.length === 0 &&
                    <button
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      className="w-full"
                      disabled={loading}
                      {...dragProps}
                    >
                      <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                    </button>}

                  <div className="grid grid-cols-2 gap-5">
                    {imageList.map((image, index) => (
                      <div key={index} className="flex items-center justify-evenly">
                        <img src={image['data_url']} alt="" className='w-10 h-10 object-cover object-top rounded' />
                        <MdEdit onClick={() => onImageUpdate(index)} className="cursor-pointer w-6 h-5 text-slate-700 dark:text-slate-300 hover:text-green-500 dark:hover:text-green-500 duration-200 transition-all" />
                        <MdDelete onClick={() => onImageRemove(index)} className="cursor-pointer w-6 h-5 text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-500 duration-75 transition-all" />
                      </div>
                    ))}
                  </div>
                  {
                    images.length > 0 &&
                    <>
                      <button onClick={onImageUpload} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-3" disabled={loading} >Add more</button>
                      <button onClick={onImageRemoveAll} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-3" disabled={loading}>Remove all images</button>
                    </>
                  }
                  {
                    errors && <div className='text-slate-700 dark:text-slate-300 mt-3 text-center'>
                      {errors.maxNumber && <span>Cannot upload more than {max} images at a time</span>}
                      {errors.acceptType && <span>Your selected file type is not allowed</span>}
                      {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                      {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                    </div>
                  }
                </div>
              )}
            </ImageUploading>
          }
        </div>
      </Modal>
    </>
  )
}
export default UploadFileModal