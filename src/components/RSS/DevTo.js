import { useEffect, useState } from "react";

const devto_API = "https://dev.to/feed";

function RSS_DevTo() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState([]); // store expanded idxs

  useEffect(() => {
    fetch(devto_API)
      .then((response) => response.text())
      .then((str) => {
        const parser = new window.DOMParser();
        const xml = parser.parseFromString(str, "application/xml");
        const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
          title: item.querySelector("title")?.textContent || "",
          creator: item.querySelector("creator")?.textContent || "",
          link: item.querySelector("link")?.textContent || "",
          pubDate: item.querySelector("pubDate")?.textContent || "",
          description: item.querySelector("description")?.textContent || "",
          categorys:
            Array.from(item.querySelectorAll("category"))
              .map((cat) => cat.textContent)
              .join(", ") || "",
        }));
        setArticles(items);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors du chargement du flux Dev.to");
        console.error("Error fetching Dev.to feed:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement du flux Dev.to...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
        {articles.slice(0, 8).map((article, idx) => {
          const isRight = idx % 2 === 1;
          const isOpen = expanded.includes(idx);
          return (
            <li
              key={idx}
              style={{
                display: "flex",
                justifyContent: isRight ? "flex-end" : "flex-start",
                width: "100%",
                marginBottom: 50,
              }}
            >
              <article
                className="message rss-widget"
                style={{
                  width: isOpen ? "min(1500px)" : "min(750px, 90vw)",
                  maxHeight: isOpen ? "none" : 350,
                  overflow: isOpen ? "visible" : "hidden",
                  boxShadow: "0 2px 8px #0001",
                  textAlign: "left",
                  padding: 40,
                  paddingBottom: 24,
                  marginLeft: isRight ? "auto" : 0,
                  marginRight: isRight ? 0 : "auto",
                  borderLeft: isRight ? "none" : "5px solid #d8d8d8ff",
                  borderRight: isRight ? "5px solid #d8d8d8ff" : "none",
                  borderRadius: 4,
                  backgroundColor: isOpen ? "#30303052" : "transparent",
                  cursor: "pointer",
                  transition: "max-height 0.3s cubic-bezier(.4,2,.6,1)",
                }}
                onClick={() => {
                  setExpanded((prev) =>
                    isOpen ? prev.filter((i) => i !== idx) : [...prev, idx]
                  );
                }}
                title={isOpen ? "Réduire" : "Voir plus"}
              >
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4
                    style={{
                      marginBottom: 5,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {article.title}
                  </h4>
                </a>
                <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                  by <strong>{article.creator}</strong> on{" "}
                  <em>{new Date(article.pubDate).toLocaleDateString()}</em>
                </p>
                <div
                  style={{ margin: "16px 0 8px 0", fontSize: 15 }}
                  dangerouslySetInnerHTML={{ __html: article.description }}
                ></div>
                <p style={{ fontSize: 13, color: "#888" }}>
                  Categories: {article.categorys}
                </p>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    marginTop: 8,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  {isOpen ? "Réduire" : ""}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RSS_DevTo;
