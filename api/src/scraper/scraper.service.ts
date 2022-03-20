import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async getData(url: string) {
    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Navigate to url specified
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });
    // Loop through text and add to array
    const results = await page.evaluate(() => {
      const contentList = [];
      document
        .querySelectorAll('[data-component="text-block"]')
        .forEach((el) => {
          contentList.push(el.textContent);
        });
      // Return text joined together
      return contentList.join(' ');
    });
    return results;
  }
}
