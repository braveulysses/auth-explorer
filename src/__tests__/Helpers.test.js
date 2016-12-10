import { guid, parseParamsFromUrl } from '../Helpers';

describe('The guid() utility function', () => {
  it('returns a string', () => {
    expect(guid()).toMatch(/\w+/);
  });
});

describe('The parseParamsFromUrl() utility function', () => {
  it('handles query parameters', () => {
    const url = 'https://example.com/callback?first=1&second=2';
    const params = parseParamsFromUrl(url);
    expect(params['first']).toEqual('1');
    expect(params['second']).toEqual('2');
  });

  it('handles hash parameters', () => {
    const url = 'https://example.com/callback#first=1&second=2';
    const params = parseParamsFromUrl(url);
    expect(params['first']).toEqual('1');
    expect(params['second']).toEqual('2');
  });
});