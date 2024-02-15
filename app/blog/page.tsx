"use client";

import { useState, useEffect  } from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function AltPage() {

	const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1); // Track the current page
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://myheartcreative.com/wp-json/wp/v2/posts?page=${page}&per_page=10`);
            const data = await response.json();
            setPosts((prevPosts) => [...prevPosts, ...data]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page]); // Fetch posts when the page changes

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };
  
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
		<div className="inline-block w-full text-center justify-center">
		  <h1 className="text-4xl font-bold">Blog Posts</h1>
		  <h1 className="text-4xl font-bold text-green-500">myheartcreative</h1>
		</div>


		<div>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <a className="text-1xl" href={post.link}>{post.title.rendered}</a>
							<p>Published on: {new Date(post.date).toLocaleString()}</p>
                            <br />
                            <br />
                        </li>
                    ))}
                </ul>
                <Button onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
                </Button>
            </div>
	  </section>
	);
  }