import axios from "axios";
import { set, size } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import UploadIcon from "../ui/icons/UploadIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/services/api.service";
import { API_PATH } from "@/services/_path.service";
import Image from "next/image";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";


interface IUploadImage {
  callback: (v: any) => void,
  callbackFile?: (v: any) => void
  typeImage?: 'url' | 'base64',
  dataImage?: string,
}

export default function FormUploadImage({ callback, callbackFile, dataImage, typeImage = 'url' }: IUploadImage) {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<any>()
  const inputRef = useRef<any>(null);

  const uploadImgae = useMutation({
    mutationFn: async ({formData, params}:{formData: FormData, params: any}) => {
        const res = await api.request({
          method: 'post',
          url: `/${API_PATH().cdn.uploadImage}`,
          params: params,
          data: formData,
        });
        if (size(res.data)) {
          const pathImage = res?.data?.data
          callback(pathImage)
          setSelectedImage(pathImage)
        }
        return res.data;
    },
    onSuccess: () => {
        // Setelah sukses, refetch data agar data terbaru muncul
        setIsLoading(false)
        setIsError(false)
        setIsSuccess(true)
    },
    onError: () => {
        setIsLoading(false)
        setIsError(true)
        setIsSuccess(false)
    },
});

  const uploadImageCDN = (file: any) => {
      setIsLoading(true)
      setIsError(false)
      setIsSuccess(false)
      const formData: any = new FormData()
      formData.append('file', file)
      // formData.append('root', 'kuningan')
      // formData.append('folder', 'kuningan-image')
      // formData.append('prefix', 'image')

      const params = {
        root: 'test',
        folder: '010203',
        randomNumber: 'false'
      }

      // console.log(formData, file)
      uploadImgae.mutate({formData: formData, params: params})
  }

  const convertImageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Fungsi callback saat pembacaan berhasil
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error('Gagal mengubah gambar ke Base64'));
        }
      };

      // Fungsi callback saat terjadi kesalahan
      reader.onerror = () => {
        reject(new Error('Terjadi kesalahan saat membaca file'));
      };

      // Membaca file sebagai data URL (Base64)
      reader.readAsDataURL(file);
    });
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      if (callbackFile) callbackFile(file)
      if (typeImage === 'url') {
        await uploadImageCDN(file);
      } else if (typeImage === 'base64') {
        convertImageToBase64(file).then((base64: any) => {
          if (callback) callback(base64)
          setSelectedImage(base64)
        })
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // const imageUrl = URL.createObjectURL(file)
      // setSelectedImage(imageUrl)
      if (callbackFile) callbackFile(file)
      if (typeImage === 'url') {
        uploadImageCDN(file);
      } else if (typeImage === 'base64') {
        convertImageToBase64(file).then((base64: any) => {
          if (callback) callback(base64)
          setSelectedImage(base64)
        })
      }
    }
  }

  useEffect(() => {
    if (dataImage) {
      setSelectedImage(dataImage)
    }
  }, [dataImage])

  return (
    <>
      <div onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onClick={() => inputRef.current?.click()}>
        <div className="cursor-pointer p-6 w-full rounded-lg border-dashed border-2 border-primary-500 bg-primary-50  dark:bg-primary-950 text-sm font-normal flex justify-center items-center">
          <div className="flex gap-3 justify-center items-center">
            <div className="text-primary-500">
              {isLoading ?
                <>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="circle-loader"></div>
                    <p className="font-medium">Uploading...</p>
                  </div>
                </>
                : selectedImage ?
                  <Image src={`https://bigdata.kuningankab.go.id:9088/blog${selectedImage}`} height='75' width='75' alt={""} className="max-h-[75px]" />
                  :
                  <UploadIcon />
              }
            </div>
            <div className="flex flex-col gap-1">
              {uploadImgae.isError ? 
                <div className="text-red-500 border border-red-200 bg-red-50 px-2 py-1 rounded-md flex gap-2 items-center"><ExclamationCircleIcon className="h-4" /> Gagal upload gambar, coba lagi!</div> 
                : uploadImgae.isSuccess ?
                  <div className="text-green-500 border border-green-200 bg-green-50 px-2 py-1 rounded-md flex gap-2 items-center"><CheckCircleIcon className="h-4" /> Berhasil upload gambar</div>
                  : null
              }
              <span>Geser File mu Disini atau</span>
              <span className="text-primary-500 font-medium">Cari</span>
              <span className="text-gray-500">Support : .png, .jpg, .svg, .pdf. Max : 20 MB</span>
            </div>
          </div>
        </div>
        <div hidden>
          <input ref={inputRef} className="input" id="fileInput" onChange={handleFileChange} type="file" accept="image/*" multiple />
        </div>
      </div>
    </>
  )
}