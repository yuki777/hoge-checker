const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const getSameDomainLinks = async (targetUrl) => {
  const { data } = await axios.get(targetUrl);
  const $ = cheerio.load(data);
  const targetHostname = url.parse(targetUrl).hostname;

  $('a').each((index, element) => {
    const href = $(element).attr('href');
    const hostname = url.parse(href).hostname;

    if (hostname === targetHostname) {
      console.log(href);
    }
  });
};

const targetUrl = process.argv[2];
getSameDomainLinks(targetUrl);
