function Menu({ onSelect }) {
  const openLink = (e, url) => {
    e && e.preventDefault();
    if (window && window.electronAPI && window.electronAPI.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <aside className="menu">
      <div className="shortcuts">
        <a
          className="button is-small"
          href="https://github.com/toukara"
          onClick={(e) => openLink(e, "https://github.com/toukara")}
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github" style={{ fontSize: "1.75em" }}></i>
        </a>
        <a
          className="button is-small"
          href="https://x.com/Benjamincms_"
          onClick={(e) => openLink(e, "https://x.com/Benjamincms_")}
          rel="noopener noreferrer"
        >
          <i
            className="fa-brands fa-x-twitter"
            style={{ fontSize: "1.75em" }}
          ></i>
        </a>
        <a
          className="button is-small"
          href="https://codepen.io/toukara"
          onClick={(e) => openLink(e, "https://codepen.io/toukara")}
          rel="noopener noreferrer"
        >
          <i
            className="fa-brands fa-codepen"
            style={{ fontSize: "1.75em" }}
          ></i>
        </a>
      </div>
      <p className="menu-label">General</p>
      <ul className="menu-list" style={{ userSelect: "none" }}>
        <li>
          <p onClick={() => onSelect && onSelect("dashboard")}>DASHBOARD</p>
        </li>
        <li>
          <p onClick={() => onSelect && onSelect("rss")}>RSS FEEDS</p>
        </li>
        <li>
          <p onClick={() => onSelect && onSelect("taskbook")}>TASK BOOK</p>
        </li>
      </ul>
      <p className="menu-label">STATS</p>
      <p className="menu-label">TEST</p>
      <ul className="menu-list">
        <li>
          <p
            onClick={() => {
              if (
                window &&
                window.electronAPI &&
                window.electronAPI.openExternal
              ) {
                window.electronAPI.openExternal("obsidian://open");
              } else {
                window.open("obsidian://open", "_blank", "noopener,noreferrer");
              }
            }}
          >
            Obsidian
          </p>
        </li>
        <li>
          <p
            onClick={() => {
              if (
                window &&
                window.electronAPI &&
                window.electronAPI.openExternal
              ) {
                window.electronAPI.openExternal("spotify:");
              } else {
                window.open("spotify:", "_blank", "noopener,noreferrer");
              }
            }}  
          >
            Spotify
          </p>
        </li>
      </ul>
    </aside>
  );
}

export default Menu;
