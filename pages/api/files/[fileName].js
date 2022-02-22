import Image from "src/models/imageModel"
import processFile from "src/middlewares/upluad.js"
import { format } from "util"
import path from "path"
const __dirname = path.resolve()
import { Storage } from "@google-cloud/storage"

// Creates a client using Application Default Credentials
const storage = new Storage({
  keyFilename: path.join(__dirname, "./allianccodes.json"),
  projectId: "allianccodes",
})
const bucket = storage.bucket("ecommerce-next")

const handler = async (req, res) => {
  const method = req.method
  const { fileName } = req.query

  switch (method) {
    case "GET":
      try {
        // const files = await Image.find({});
        const filename = req.params.filename
        const [files] = await bucket.getFiles({
          prefix: filename,
        })

        res.status(200).json({
          status: "success",
          files: files,
          bucket,
        })
      } catch (error) {
        res.status(406).json({
          status: "Fail",
          error,
        })
      }
    case "DELETE":
      try {
        await gfs.files.deleteOne({ filename: req.params.filename })
        res.send("success")
      } catch (error) {
        console.log(error)
        res.send("An error occured.")
      }
    case "PUT":
      const file = await req.file

      try {
        await processFile(req, res)

        if (!req.file) {
          return res.status(400).send({ message: "Please upload a file!" })
        }
        // if ((req.file.mimetype !== "image/jpeg", "image/png")) {
        //   return res.status(500).send("noooo dddd fff");
        // }

        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(`${req.body.user}/${req.file?.originalname}`)

        const blobStream = blob.createWriteStream({
          resumable: false,
        })

        blobStream.on("error", (err) => {
          return res.status(500).send("noooo dddd fff")
        })
        //urlhttps://storage.googleapis.com/ecommerce-next/cv17.jpg
        blobStream.on("finish", async (data) => {
          // Create URL for directly file access via HTTP.
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          )

          return res.status(200).send({
            message:
              "Uploaded the file successfully: " + req.file?.originalname,
            url: publicUrl,
          })
        })

        blobStream.end(req.file.buffer)
      } catch (err) {
        return res.status(500).send({
          error: `Could not upload the file: ${req.file.originalname}. ${err}`,
        })
      }
  }
}
export default dbInit(handler)

function saveImg(Image, coverEncoded) {
  if (coverEncoded === null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null) {
    Image.img = new Buffer.from(cover.data, "base64")
  }
}
