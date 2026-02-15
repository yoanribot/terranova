import { getStrapiMedia } from "@/lib/utils";
import styles from "./Card.module.css";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  imagePath: string;
  title: string;
  description: string;
  tags?: { text: string }[];
  alt?: string;
}

const Card = ({ imagePath, title, description, tags, alt }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={getStrapiMedia(imagePath)}
          alt={alt || title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {!!tags?.length && (
          <ul className="flex gap-2">
            {tags.map((tag, index) => (
              <li key={index}>
                <Badge variant="link" className={styles.tag}>
                  {tag.text}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Card;
