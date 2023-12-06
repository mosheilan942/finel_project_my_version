import React, { useState, useContext } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import productsAPI from "../api/productsAPI";
import { UserContext } from "../UserContext.tsx";

interface Review {
  title: string;
  author: string;
  body: string;
  rating: number;
  thumbup: number;
  thumbdown: number;
}

interface ProductReviewsProps {
  reviews: Review[] | undefined;
  pid: string | undefined;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, pid }) => {
  const context = useContext(UserContext)!;
  const { userInfo } = context;
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);

  const reviewStyles: Record<string, React.CSSProperties> = {
    productReviews: {
      margin: "20px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
    },
    reviewsTitle: {
      color: "#333",
    },
    noReviews: {
      color: "#777",
    },
    reviewsList: {
      listStyle: "none",
      padding: "0",
    },
    reviewItem: {
      marginBottom: "20px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    reviewHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    reviewTitle: {
      color: "#333",
      margin: "0",
    },
    reviewAuthor: {
      color: "#777",
      margin: "0",
    },
    reviewText: {
      color: "#555",
    },
    reviewRating: {
      color: "#ff9900",
      fontWeight: "bold",
    },
    seeMoreButton: {
      background: "#4caf50",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    thumbsContainer: {
      display: "flex",
      marginTop: "10px",
    },
    thumbsIcon: {
      marginRight: "8px",
      cursor: "pointer",
    },
  };

  const handleSeeMoreClick = () => {
    setShowAllReviews(true);
  };

  const handleThumbsClick = async (feedback: boolean) => {
    try {
      const thumbs = await productsAPI.reviewFeedbackProduct(feedback, userInfo?.id, pid);
      console.log("Thumbs response:", thumbs);

      if (feedback) {
        setThumbsUpCount((prevCount) => prevCount + 1);
      } else {
        setThumbsDownCount((prevCount) => prevCount + 1);
      }
    } catch (err) {
      console.error("Error fetching thumbs:", err);
    }
  };

  return (
    <div style={reviewStyles.productReviews}>
      <h2 style={reviewStyles.reviewsTitle}>Product Reviews</h2>

      {!reviews || reviews.length === 0 ? (
        <p style={reviewStyles.noReviews}>No reviews yet.</p>
      ) : (
        <>
          <ul style={reviewStyles.reviewsList}>
            {Array.isArray(reviews) &&
              reviews
                .slice(0, showAllReviews ? reviews.length : 1)
                .map((review, index) => (
                  <li key={index} style={reviewStyles.reviewItem}>
                    <div style={reviewStyles.reviewHeader}>
                      <h3 style={reviewStyles.reviewTitle}>{review.title}</h3>
                      <div>
                        <p style={reviewStyles.reviewAuthor}>By: {review.author}</p>
                        <div style={reviewStyles.thumbsContainer}>
                          <div
                            onClick={() => {
                              handleThumbsClick(true);
                              console.log("Thumb Up clicked");
                            }}
                          >
                            <ThumbUpAltIcon style={reviewStyles.thumbsIcon} />
                            <span>{Number(review.thumbup) + thumbsUpCount}</span>
                          </div>

                          <div
                            onClick={() => {
                              handleThumbsClick(false);
                              console.log("Thumb Down clicked");
                            }}
                          >
                            <ThumbDownAltIcon style={reviewStyles.thumbsIcon} />
                            <span>{Number(review.thumbdown) + thumbsDownCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p style={reviewStyles.reviewText}>{review.body}</p>
                    <p style={reviewStyles.reviewRating}>Rating: {review.rating}/5</p>
                  </li>
                ))}
          </ul>
          {!showAllReviews && (
            <button style={reviewStyles.seeMoreButton} onClick={handleSeeMoreClick}>
              See More Reviews
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductReviews;
