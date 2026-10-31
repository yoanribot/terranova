export type GoogleReview = {
  id: string;
  author: string;
  authorUrl?: string;
  avatarUrl?: string;
  rating: number;
  dateLabel?: string | null;
  publishedAt?: string | null;
  text: string;
  reviewUrl?: string | null;
};

export type GoogleReviewsData = {
  name: string;
  mapsUrl: string;
  capturedAt?: string;
  rating?: number;
  reviewCount?: number;
  reviews: GoogleReview[];
};
