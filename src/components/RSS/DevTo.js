import { useEffect, useState } from "react";

const devto_API = "https://dev.to/feed";

function RSS_DevTo() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchRSS() {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            devto_API
          )}`
        );
        const data = await response.json();
        setArticles(data.items || []);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    }
    fetchRSS();
  }, []);

  return (
    <div className="widget rss-widget">
      <h2 className="rss-widget-title" style={{ marginBottom: "15px" }}>
        Latest Dev.to Articles
      </h2>
      <ul
        className="rss-article-list"
        style={{ listStyleType: "none", padding: 0 }}
      >
        <li
          className="rss-article-item"
          style={{
            border: "1px solid #A3A3A3",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            gap: "5px",
          }}
        >
          <p
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "35vw",
            }}
          >
            Article Title
          </p>
          <div
            className="separator"
            style={{
              borderLeft: "1px solid #A3A3A3",
              height: "3vh",
              display: "inline-block",
              margin: "0 10px",
            }}
          />

          <p
            style={{
              width: "6vw",
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            Author
          </p>
          <div
            className="separator"
            style={{
              borderLeft: "1px solid #A3A3A3",
              height: "3vh",
              display: "inline-block",
              margin: "0 10px",
            }}
          />
          <p
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "6vw",
            }}
          >
            pubDate
          </p>
          <div
            className="separator"
            style={{
              borderLeft: "1px solid #A3A3A3",
              height: "3vh",
              display: "inline-block",
              margin: "0 10px",
            }}
          />
          <p
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "6vw",
            }}
          >
            tags
          </p>
        </li>
        {articles.map((article) => (
          <li
            key={article.guid}
            className="rss-article-item"
            style={{
              border: "1px solid #A3A3A3",
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
              gap: "5px",
            }}
          >
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                width: "35vw",
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {article.title}
            </a>
            <div
              className="separator"
              style={{
                borderLeft: "1px solid #A3A3A3",
                height: "3vh",
                display: "inline-block",
                margin: "0 10px",
              }}
            />

            <p
              style={{
                width: "6vw",
                display: "inline-block",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {article.author}
            </p>
            <div
              className="separator"
              style={{
                borderLeft: "1px solid #A3A3A3",
                height: "3vh",
                display: "inline-block",
                margin: "0 10px",
              }}
            />
            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "6vw",
              }}
            >
              {new Date(article.pubDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </p>
            <div
              className="separator"
              style={{
                borderLeft: "1px solid #A3A3A3",
                height: "3vh",
                display: "inline-block",
                margin: "0 10px",
              }}
            />
            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "16vw",
              }}
            >
              {article.categories.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TODO : WHEN CLICK ON ARTICLE, OPEN A MODAL WITH THE CONTENT OF THE ARTICLE


export default RSS_DevTo;
