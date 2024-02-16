"use client";

import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

export default function Home() {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFetchSitemap = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await axios.get(sitemapUrl);
      const xmlData = response.data;

      const jsonData = await parseStringPromise(xmlData, { explicitArray: false });

      // Extracting the sitemap URL from the jsonData
      const fetchedSitemapUrl = jsonData.urlset.url.loc;

      setDownloadUrl(fetchedSitemapUrl);
    } catch (error) {
      console.error('Error fetching sitemap:', error);
    }
  };

  return (
    <section>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block w-full text-center justify-center">
          <h1 className="text-4xl font-bold">Website</h1>
          <h1 className="text-4xl font-bold text-cyan-500">Sitemap Generator</h1>
        </div>

        <form
          className="flex flex-row items-center justify-center gap-4 py-8 md:py-10 w-full"
          onSubmit={handleFetchSitemap}
        >
          <Input
            type="text"
            label="Enter Website URL"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            required
          />
          <Button onClick={handleFetchSitemap} type="submit" color="primary">
            Generate Sitemap
          </Button>
        </form>
        {downloadUrl && (
          <a href={downloadUrl} download>
            Download Sitemap
          </a>
        )}
      </section>
    </section>
  );
}