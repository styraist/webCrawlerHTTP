const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.example.com/path'
    const actual = normalizeURL(input)
    const expected = 'blog.example.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.example.com/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.example.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.example.com/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.example.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.example.com/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.example.com/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.example.com/path/">
                Example.com Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.example.com/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.example.com/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Example.com Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.example.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.example.com/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.example.com/path1/">
                Example.com Blog Path One
            </a>
            <a href="/path2/">
                Example.com Blog Path Two
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.example.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.example.com/path1/", "https://blog.example.com/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.example.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})