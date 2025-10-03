import { useEffect, useState } from "react";

const devto_API = "https://dev.to/feed";

function RSS_DevTo() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <ul>
        {articles.slice(0, 8).map((article, idx) => (
          // console.log(idx ,article ),
          <article className="message rss-widget">
            <div className="message-body" style={{padding: '50px', paddingBottom: "30px" , maxWidth: '650px'}}>
              <li key={idx} style={{ marginBottom: 50 }}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4 style={{ marginBottom: 5, fontSize: 18, fontWeight: "bold" }}>{article.title}</h4>
                </a>

                <p>
                  by <strong> {article.creator} </strong> on {""}
                  <em>{new Date(article.pubDate).toLocaleDateString()}</em>
                </p>
                <br />
                <p
                  dangerouslySetInnerHTML={{ __html: article.description }}
                ></p>
                <p>Categories: {article.categorys}</p>
                <hr />
              </li>
            </div>
                <div className="separator"></div>
          </article>
        ))}
      </ul>
    </div>
  );
}



export default RSS_DevTo;
