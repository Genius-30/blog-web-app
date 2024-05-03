import React, { useState, useEffect } from "react";
import dataBaseService from "../appwrite/db";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dataBaseService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
    setLoader(false);
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-slate-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return loader ? (
    <p>Loading...</p>
  ) : (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImg={post.featuredImg}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
