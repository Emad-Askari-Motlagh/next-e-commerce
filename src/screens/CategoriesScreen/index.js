import React from "react";
import Image from "next/image";
import styles from "./Categories.module.scss";
import Link from "next/link";
import { v4 as uuid } from "uuid";
const categorysItems = [
  { name: "New Out", emoji: "⚡", link: "/", id: 13465 },
  { name: "Fordon", emoji: "🚘", link: "/", id: 265478 },
  { name: "Present", emoji: "🎁", link: "/", id: 353424 },
  { name: "Cloth", emoji: "👚", link: "/", id: 43657 },
  { name: "Pet", emoji: "🐕", link: "/", id: 56543 },
  { name: "Hobby", emoji: "🤸", link: "/", id: 6423125 },
  { name: "Jwerly", emoji: "💎", link: "/", id: 75643 },
  { name: "Sport", emoji: "⚽", link: "/", id: 83675 },
  { name: "Home", emoji: "⛪", link: "/", id: 96453 },
  { name: "New In", emoji: "⛳", link: "/", id: 1035467 },
  { name: "Interior", emoji: "🌆", link: "/", id: 11543 },
  { name: "Study", emoji: "🎒", link: "/", id: 123456 },
  { name: "Book", emoji: "📖", link: "/", id: 1436457 },
];

const CategoryItem = ({ name, link, emoji }) => {
  return (
    <li className={styles.categoryItem}>
      <Link href={link || "/"}>
        <a style={{ display: "flex", flexDirection: "column" }}>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default function CategoriesBar() {
  return (
    <div className={styles.container}>
      <ul className={styles.categories}>
        {categorysItems.map((item) => {
          return (
            <div key={item.name}>
              <CategoryItem
                name={item.name}
                emoji={item.emoji}
                link={item.link}
                itemKey={uuid()}
                src={item.src}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
