import React, { useEffect, useState } from "react"
import { FaShirtsinbulk, FaDog, FaBook } from "react-icons/fa"
import { AiFillCar } from "react-icons/ai"
import { GiPresent, GiClothes, GiGoldBar } from "react-icons/gi"
import { MdFitnessCenter, MdFiberNew } from "react-icons/md"
import { FcSportsMode } from "react-icons/fc"
import { ImHome2 } from "react-icons/im"
import { SiMaterialdesignicons } from "react-icons/si"
import { BsBookHalf } from "react-icons/bs"
export default function useData() {
  const [data, setData] = useState([])
  const categorysItems = [
    {
      name: "New Out",
      src: (
        <FaShirtsinbulk
          size={44}
          style={{ fontSize: "12px" }}
          color="#001f3f"
        />
      ),
      link: `/`,
      id: 1,
      height: 320,
      width: 300,
    },
    {
      name: "Fordon",
      src: <AiFillCar size={44} color="#001f3f" />,
      link: `/`,
      id: 2,
      height: 250,
      width: 270,
    },
    {
      name: "Present",
      src: <GiPresent size={44} color="#001f3f" />,
      link: "/",
      id: 3,
      height: 300,
      width: 220,
    },
    {
      name: "Cloth",
      src: <GiClothes size={44} color="#001f3f" />,
      link: "/",
      id: 4,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "Pet",
      src: <FaDog size={44} color="#001f3f" />,
      link: "/",
      id: 5,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "Hobby",
      src: <FaShirtsinbulk size={44} color="#001f3f" />,
      link: "/",
      id: 6,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "Jwerly",
      src: <GiGoldBar size={44} color="#001f3f" />,
      link: "/",
      id: 7,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "Sport",
      src: <FcSportsMode size={44} color="#001f3f" />,
      link: "/",
      id: 8,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "Home",
      src: <ImHome2 size={44} color="#001f3f" />,
      link: "/",
      id: 9,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "New In",
      src: <MdFiberNew size={44} color="#001f3f" />,
      link: "/",
      id: 10,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "Interior",
      src: <SiMaterialdesignicons size={44} color="#001f3f" />,
      link: "/",
      id: 11,
      height: randomMaker(),
      width: randomMaker(),
    },
    {
      name: "Study",
      src: <FaBook size={44} color="#001f3f" />,
      link: "/",
      id: 12,
      height: 320,
      width: 300,
    },
    {
      name: "Book",
      src: <BsBookHalf size={44} color="#001f3f" />,
      link: "/",
      id: 13,
      height: 320,
      width: 300,
    },
  ]
  function randomMaker() {
    return Math.random() * (300 - 200) + 200
  }

  useEffect(() => {
    setData([...categorysItems])
  }, [])
  return { categorysItems: data }
}
