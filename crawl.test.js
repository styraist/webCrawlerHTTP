const { normalizeURL } = require('./crawl.js')
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