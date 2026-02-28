import axios from "axios";
export const getNews = async (req, res) => {
  try {
    const { country = "us", category = "technology" } = req.query;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
    
    console.log("Fetching URL:", url);  // log for debugging
    
    let response = await axios.get(url);

    // fallback
    if (!response.data.articles || response.data.articles.length === 0) {
      const fallbackUrl = `https://newsapi.org/v2/everything?q=${category}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
      console.log("Falling back to URL:", fallbackUrl);
      response = await axios.get(fallbackUrl);
    }

    console.log("Fetched articles count:", response.data.articles.length);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};