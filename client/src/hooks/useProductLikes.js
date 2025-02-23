import { useState, useEffect } from "react";

const useProductLikes = (id) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/like/${id}`);
        const data = await response.json();
        setLikes(data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [id]);

  return likes;
};

export default useProductLikes;