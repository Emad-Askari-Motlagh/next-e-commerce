module.exports = {
  swcMinify: false,
  images: {
    domains: [
      "gs://react-native-app-cda09.appspot.com/images",
      "",
      "localhost:3000",
      "localhost:4000",
      "SERVER_LINK=https://rent-app-emad.herokuapp.com",
      "*",
      "firebasestorage.googleapis.com",
      "www.freepik.com",
    ],
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    SERVER_LINK: process.env.SERVER_LINK,
    MONGODB_URI: process.env.MONGODB_URI,
  },
}
