"use client";

import { useState } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import {Input} from "@nextui-org/input";
import {Button, ButtonGroup} from "@nextui-org/button";	

export default function Home() {

	const [videoId, setVideoId] = useState("");
	const [thumbnails, setThumbnails] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const videoIdFromUrl = new URL(videoId).searchParams.get("v");
		  const thumbnailUrl = "https://i.ytimg.com/vi/" + videoIdFromUrl + "/"
		const thumbnailResolutions = [
		"default",
		"mqdefault",
		"hqdefault",
		"sddefault",
		"maxresdefault",
		];

		const thumbnails = thumbnailResolutions.map((resolution) => ({
		url: thumbnailUrl + resolution + ".jpg",
		resolution: resolution,
		}));

		setThumbnails(thumbnails);
	};

	
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
		<div className="inline-block max-w-lg text-center justify-center">
			<h1 className="text-4xl font-bold">YouTube Thumbnail</h1>
			<h1 className="text-4xl font-bold text-violet-500">Downloader</h1>
		</div>

		<form
			className="flex flex-row items-center justify-center gap-4 py-8 md:py-10 w-full"
			onSubmit={handleSubmit}
		>
			<Input
			type="text"
			label="Enter YouTube Video URL"
			value={videoId}
			onChange={(e) => setVideoId(e.target.value)}
			required
			/>
			<Button type="submit" color="primary">
			Submit
			</Button>
		</form>

		{thumbnails.length > 0 && (
			<div className="flex flex-col items-center gap-4" id="thumbnails">
			{thumbnails.map((thumbnail) => (
				<img
				key={thumbnail.resolution}
				src={thumbnail.url}
				className="thumbnail"
				alt={`Thumbnail (${thumbnail.resolution})`}
				style={{ cursor: "pointer" }}
				/>
			))}
			</div>
		)}
		</section>
	);
}