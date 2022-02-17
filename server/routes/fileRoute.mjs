import imageModel from "../models/imageModel.js";
import processFile from "../middlewares/upluad.mjs";
import { format } from "util";

const Image = imageModel;
import path from "path";
const __dirname = path.resolve();

import { Storage } from "@google-cloud/storage";

// Creates a client using Application Default Credentials
const storage = new Storage({
  keyFilename: path.join(__dirname, "../next-shopia/server/allianccodes.json"),
  projectId: "allianccodes",
});
const bucket = storage.bucket("ecommerce-next");

const fileRoute = (server) => {

  server.post("/upload", async (req, res) => {
    const file = await req.file;

    try {
      await processFile(req, res);

      if (!req.file) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      // if ((req.file.mimetype !== "image/jpeg", "image/png")) {
      //   return res.status(500).send("noooo dddd fff");
      // }

    
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(`${req.body.user}/${req.file?.originalname}`);

      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on("error", (err) => {
        return res.status(500).send("noooo dddd fff");
      });
      //urlhttps://storage.googleapis.com/ecommerce-next/cv17.jpg
      blobStream.on("finish", async (data) => {
        // Create URL for directly file access via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        return res.status(200).send({
          message: "Uploaded the file successfully: " + req.file?.originalname,
          url: publicUrl,
        });
      });

      blobStream.end(req.file.buffer);
    } catch (err) {
      return res.status(500).send({
        error: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  });

  // media routes
  server.get("/file/:filename", async (req, res) => {
    try {
      // const files = await Image.find({});
      const filename = req.params.filename;
      const [files] = await bucket.getFiles({
        prefix: filename,
      });

      res.status(200).json({
        status: "success",
        files: files,
        bucket,
      });
    } catch (error) {
      res.status(406).json({
        status: "Fail",
        error,
      });
    }
  });

  server.delete("/file/:filename", async (req, res) => {
    // try {
    //   await gfs.files.deleteOne({ filename: req.params.filename });
    //   res.send("success");
    // } catch (error) {
    //   console.log(error);
    //   res.send("An error occured.");
    // }
  });

  // media routes
  server.get("/file/:filename", async (req, res) => {
    // try {
    //   const file = await gfs.files.findOne({ filename: req.params.filename });
    //   const readStream = gfs.createReadStream(file.filename);
    //   readStream.pipe(res);
    // } catch (error) {
    //   res.send("not found");
    // }
  });

  server.delete("/file/:filename", async (req, res) => {
    // try {
    //   await gfs.files.deleteOne({ filename: req.params.filename });
    //   res.send("success");
    // } catch (error) {
    //   console.log(error);
    //   res.send("An error occured.");
    // }
  });
};

function saveImg(Image, coverEncoded) {
  if (coverEncoded === null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null) {
    Image.img = new Buffer.from(cover.data, "base64");
  }
}
export default fileRoute;
