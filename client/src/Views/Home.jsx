import { useEffect, useState } from "react";
import { getAll } from "../Services/post";
import { Link } from "react-router-dom";
import { useCheckToken } from "../Services/user";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useCheckToken();

  async function getData() {
    const response = await getAll();
    if (response === undefined) {
      setPosts([]);
      alert("Network Error");
    } else if (response.status === "ok") {
      setPosts(response.result);
    } else {
      console.log("Error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 p-8 text-gray-500">
      <div>
        {/* Header */}

        {/* Add Posts Button */}
        <div>
        <h1 className="text-2xl font-bold mb-5 hover:text-gray-300 transition-all">
          The KeepSake
        </h1>   
          <Link
            to="/posts/add"
            className="bg-gray-800 border border-gray-700 mt-5 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-emerald-400 transition-all"
          >
            What's on your mind?
          </Link>

          <Link
            to="/users/posts"
            className="bg-gray-800 border border-gray-700 mt-5 ml-5 px-2 py-1 rounded-full hover:bg-gray-700 hover:text-amber-400 transition-all"
          >
            Your Posts
          </Link>
        </div>
        <br />

        {/* No Posts Message */}
        {posts.length === 0 && (
          <div className="text-center text-lg text-gray-500 mt-12">
            There are no posts
          </div>
        )}

        {/* Post List */}
        {posts.length > 0 && (
          <div className="space-y-5 space-x-5">
            {posts.map((post, index) => (
              <div
                key={index}
                className="inline-block bg-gray-800 border border-gray-600 ml-5 rounded-md shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all p-2"
              >
                <h2 className="text-md font-bold text-gray-500 px-4 py-2">
                  {post.title}
                </h2>
                <br />
                <p className="text-gray-400 text-sm px-3">{post.message}</p>
                <br />
                <p className="text-xs text-gray-600 px-2">
                  <span className="font-semibold">Likes:</span> {post.likes} |{" "}
                  <br />
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(post.createTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
