const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const getSameDomainLinks = async (targetUrl) => {
  const { data } = await axios.get(targetUrl);
  const $ = cheerio.load(data);
  const targetHostname = url.parse(targetUrl).hostname;

  const links = new Set();

  $('a').each((index, element) => {
    const href = $(element).attr('href');
    if (href) {
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
