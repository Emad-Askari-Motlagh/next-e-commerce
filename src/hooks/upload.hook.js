import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";

export default function useUploader() {
  const Router = useRouter();
  const [fetchedFiles, setFetchedFiles] = useState([]);
  const [Uploaded, setuploaded] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState();
  const [images, setImages] = useState([]);
  const [uploadError, setUploadError] = useState();
  const [id, setId] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const imageId = uuid();
    setId(imageId);
  }, []);

  async function getPaths(uploaded) {

    const res = await axios.get(`${process.env.SERVER_LINK}/file/emi`);
    await setFetchedFiles(res.data.files);
    setuploaded(false);
    await setImages(res.data.files);

    try {
      const res = await axios.get(`${process.env.SERVER_LINK}/file/${id}`);
      await setFetchedFiles(res.data.files);
      setuploaded(false);
      await setImages(res.data.files);
    } catch (err) {}

  }

  async function upload(file) {
    try {
      if (file) {
        const data = new FormData();
        data.append("user", id);
        data.append("file", file);
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };

        const res = await axios.post(
          `${process.env.SERVER_LINK}/upload`,
          data,
          config
        );
        const response = await res.data;

          await getPaths(uploadedImageName);
        }
      
    } catch (error) {
      setUploadError("Couldnt upload a file", error.data, error?.response?.data);
   
    }
  }
  async function saveOnDb(name, price, description, rating, reviews, category) {
    try {
      if (category && uploadedImageName) {
        const res = await axios.post(
          `${process.env.SERVER_LINK}/api/products`,
          {
            name,
            price,
            image: uploadedImageName,
            description,
            rating: 44,
            reviews: "ok",
            category,
          }
        );
        setuploaded(false);

        if (res.data && res.status === 201) {
          Router.reload();
        }
      }
    } catch (err) {
      console.log("Couldnt upload a file", error.data, error?.response?.data);
    }
  }

  return {
    upload,
    fetchedFiles,
    saveOnDb,
    Uploaded,
    images,
    uploadError,
  };
}
