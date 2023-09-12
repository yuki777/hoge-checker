const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const getSameDomainLinks = async (targetUrl) => {
  const { data } = await axios.get(targetUrl);
  const $ = cheerio.load(data);
  const targetUrlParsed = url.parse(targetUrl);
  const targetHostname = targetUrlParsed.hostname;

  const links = new Set();

  $('script, link[rel="stylesheet"]').each((index, element) => {
    let href = $(element).attr('href') || $(element).attr('src');
    if (href) {
      // Convert relative URLs to absolute
      if (href.startsWith('/')) {
        href = url.resolve(targetUrl, href);
      }

      const hostname = url.parse(href).hostname;

      if (hostname === targetHostname) {
        links.add(href);
      }
    }
  });

  links.forEach(link => console.log(link));
};

const targetUrl = process.argv[2];
getSameDomainLinks(targetUrl);
