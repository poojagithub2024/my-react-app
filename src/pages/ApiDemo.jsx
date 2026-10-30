
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./ApiDemo.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function ApiDemo() {
  const [refreshCount, setRefreshCount] = useState(0);

  const {
    data: posts,
    loading,
    error,
  } = useFetch(`${API_URL}?refresh=${refreshCount}`);

  const handleRefresh = () => {
    setRefreshCount((count) => count + 1);
  };

  if (loading) {
    return (
      <main className="api-demo">
        <p className="api-status">Loading posts...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="api-demo">
        <h1>Unable to Load Posts</h1>
        <p className="api-error" role="alert">
          {error}
        </p>

        <button
          type="button"
          className="api-retry-btn"
          onClick={handleRefresh}
        >
          Try Again
        </button>
      </main>
    );
  }

  const visiblePosts = posts.slice(0, 10);

  return (
    <main className="api-demo">
      <header className="api-header">
        <p className="api-eyebrow">API INTEGRATION</p>
        <h1>Latest Posts</h1>
        <p>Fetched using our reusable custom hook.</p>
      </header>

      {visiblePosts.length === 0 ? (
        <p className="api-status">No posts found.</p>
      ) : (
        <div className="api-post-list">
          {visiblePosts.map((post) => (
            <article className="api-post-card" key={post.id}>
              <span className="api-post-number">
                POST #{post.id}
              </span>

              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      )}

      <button
        type="button"
        className="api-retry-btn"
        onClick={handleRefresh}
      >
        Refresh Posts
      </button>
    </main>
  );
}

export default ApiDemo;
