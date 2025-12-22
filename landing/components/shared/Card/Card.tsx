import styles from "./Card.module.css";

interface CardProps {
  image: string;
  title: string;
  description: string;
  alt?: string;
}

const Card = ({ image, title, description, alt }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={alt || title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
