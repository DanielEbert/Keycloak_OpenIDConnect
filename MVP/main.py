#!/usr/bin/env python3

from MVPFuzzer import MVPFuzzer

import pyppeteer

import asyncio
import time

async def main():
    fuzzer = MVPFuzzer()

    b = await pyppeteer.launch()
    for _ in range(10000):
        p = await b.newPage()

        @p.on('pageerror')
        def on_error(msg):
          print(msg)

        await p.coverage.startJSCoverage({'resetOnNavigation': False})
        await p.goto('http://0.0.0.0:8000/example.html')

        # input field has text in it. click 3 times to select all, next key
        # press will remove the input 
        await p.click('input[name=myinput]', clickCount=3)
        inp = fuzzer.next_test_case()
        await p.type('input[name=myinput]', inp)

        # await p.screenshot({'path': 'checkme.png'})
        cov = await p.coverage.stopJSCoverage()
        fuzzer.evaluate_coverage(inp, cov)
        await p.close()
    print('Finished')
    await b.close()

asyncio.get_event_loop().run_until_complete(main())
