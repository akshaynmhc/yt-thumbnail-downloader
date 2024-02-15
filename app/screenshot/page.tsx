"use client";

import { useState } from 'react';
import {Input} from "@nextui-org/input";
import {Button, ButtonGroup} from "@nextui-org/button";	
import {Spinner} from "@nextui-org/spinner";

export default function ScreenshotPage() {

	const [url, setUrl] = useState('');
	const [screenshot, setScreenshot] = useState('');
	const [loading, setLoading] = useState(false);

	const handleUrlChange = (event) => {
		setUrl(event.target.value);
	};

	const captureScreenshot = async () => {
		setLoading(true);
		setScreenshot('');
		try {
			const response = await fetch(`https://webstack-screenshot.vercel.app/?url=${url}`);
			const data = await response.blob();
		setScreenshot(URL.createObjectURL(data));
		} catch (error) {
			console.error('Error capturing screenshot:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await captureScreenshot();
	  };


    return (
		<section>
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
		<div className="inline-block w-full text-center justify-center">
		  <h1 className="text-4xl font-bold">Website</h1>
		  <h1 className="text-4xl font-bold text-cyan-500">Screenshot Generator</h1>
		</div>
		
		<form
		className="flex flex-row items-center justify-center gap-4 py-8 md:py-10 w-full"
		onSubmit={handleSubmit}
		>
		<Input
			type="text"
			label="Enter Website URL"
			value={url}
			onChange={handleUrlChange}
			required
		/>
		<Button type="submit" color="primary">
			Capture Screenshot
		</Button>
		</form>
		
	  </section>
	  <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
	  	{loading && <p><Spinner label="Generating Screenshot" color="primary" labelColor="primary"/></p>}
		{screenshot && <img src={screenshot} alt="Website Screenshot" />}
	  </section>
	  </section>
	);
  }