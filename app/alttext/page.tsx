"use client";

import { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function AltPage() {

	const [imageUrl, setImageUrl] = useState('');
	const [iframeHtml, setIframeHtml] = useState('');
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  const response = await fetch(`https://alt.fairdataihub.org/api/generate?imageUrl=${imageUrl}`);
	  const htmlResponse = await response.text();
	  setIframeHtml(htmlResponse);
	};
  
	return (
	  <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
		<div className="inline-block max-w-lg text-center justify-center">
		  <h1 className="text-4xl font-bold">Alt Text</h1>
		  <h1 className="text-4xl font-bold text-green-500">Generator</h1>
		</div>
		<form
		  className="flex flex-row items-center justify-center gap-4 py-8 md:py-10 w-full"
		  onSubmit={handleSubmit}
		>
		  <Input
			type="text"
			label="Enter Image URL"
			value={imageUrl}
			onChange={(e) => setImageUrl(e.target.value)}
			required
		  />
		  <Button type="submit" className="bg-green-500">
			Submit
		  </Button>
		</form>
		{iframeHtml && <iframe title="Generated Alt Text" srcDoc={iframeHtml} />}
	  </section>
	);
  }