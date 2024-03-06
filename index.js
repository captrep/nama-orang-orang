// const puppeteer = require('puppeteer-extra')
const readline = require('readline-sync')
const cheerio = require('cheerio');
const fetch = require('node-fetch');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

async function getName(value) {
    const user = [];
    for (let i = 0; i < value; i++) {
        const num = 36;
        const rand = Math.floor(2000 + Math.random() * num+value).toString();
        const data = await fetch(
            `https://www.random-name-generator.com/indonesia?s=${rand}&gender=male&n=1`, {
                method: "GET",
            }
        );
        const response = await data.text();
        const $ = cheerio.load(response);
        const result = $("dd.h4.col-12").text();
        const name = result.replace(" (Male)", "");
        user.push(name);
    }
    return user;
}
(async() => {
    try {
        const jumlah = readline.question("Brp ? : ")
        const name = await getName(jumlah);
        for (let i = 0; i < name.length; i++) {
            console.log(`Result ${i+1} = ${name[i]}`);
        }
    }catch (e) {
        console.log(`GAGAL MENCOBA ULANG!`)
    }
})();