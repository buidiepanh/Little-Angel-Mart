import React from "react";
import { useQuery, gql } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import "./PostPage.css";
import { GET_POSTS } from "../Queries/post";

const PostPage = () => {
  // Use useQuery hook to fetch data from the GraphQL API
  const { loading, error, data: postData } = useQuery(GET_POSTS);

  // Display loading message while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Display error message if there is an error fetching data
  if (error) return <p>Error</p>;

  return (
    <>
      {/* Render the Header component */}
      <Header />

      <div className="postPage">
        <div className="content-wrapper">
          {/* Page title */}
          <h2>Tất cả bài viết</h2>

          <div className="postPage__articles">
            <Grid container spacing={2}>
              {/* Map through the fetched posts and render each post */}
              {postData &&
                postData.posts.map((post) => {
                  // Extract the link from the post data
                  const link = post.link?.document?.[0]?.children?.find(
                    (child) => child.href
                  )?.href;

                  return (
                    <Grid key={post.id} item xs={4}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="postPage__item"
                      >
                        <div className="card__header">
                          {/* Render the post image */}
                          {post.image?.publicUrl && (
                            <img
                              src={post.image.publicUrl}
                              alt={post.title}
                              className="card__image"
                            />
                          )}
                        </div>

                        <div className="card__body">
                          {/* Render the post title */}
                          <h4>{post.title}</h4>

                          {/* Render the post content */}
                          <p>{post.content}</p>
                        </div>
                      </a>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </div>
      </div>
      {/* Render the Footer component */}
      <Footer />
    </>
  );
};

export default PostPage;
