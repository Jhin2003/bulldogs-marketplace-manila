import { useState, useEffect } from "react";
import { getTrendingWord } from "../service/api"; // Adjust the path based on your project structure

const useTrendingWord = () => {
  const [trendingWord, setTrendingWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingWord = async () => {
      try {
        const word = await getTrendingWord();
        setTrendingWord(word);
      } catch (err) {
        setError(err.message || "Error fetching trending word");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingWord();
  }, []);

  return { trendingWord, loading, error };
};

export default useTrendingWord;