const puppeteer = require('puppeteer');

module.exports = async function bot(city) { 
    const result = (async () => {
        const browser = await puppeteer.launch({
            headless: true,
    
            slowMo: 250,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process',
            ],
        });
        const page = await browser.newPage();
        await page.goto('https://www.climatempo.com.br/');
        console.log('acessou o site do climatempo')
        await page.click('button', {})
        await page.click('#bt_modalSearch_mobile')
        await page.type('#searchGeneralMobile', city);
        console.log('pesquisou pela cidade informada')
        const linkCity = await page.evaluate(function() {
            return document.querySelector('.actAddFavoriteLocale').href;
        });
        console.log(linkCity)
        await page.goto(linkCity)
        
        const dataTemp = await page.evaluate(() => {
            const tempMax = document.getElementById('max-temp-1').innerHTML
            const tempMin = document.getElementById('min-temp-1').innerHTML
            const rain = document.querySelectorAll('span._margin-l-5')[1].innerText
    
            const sun = document.querySelectorAll('li.item')[20].innerText.replace('Sol\n', '')
    
            return { tempMax, tempMin, rain, sun }
    
        })
        console.log('concluido!')
        return dataTemp;

    })();

    return result;

}