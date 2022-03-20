import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async getData(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });
    const results = await page.evaluate(() => {
      const contentList = [];
      document
        .querySelectorAll('[data-component="text-block"]')
        .forEach((el) => {
          contentList.push(el.textContent);
        });
      return contentList.join(' ');
    });
    console.log(results);
  }
}
