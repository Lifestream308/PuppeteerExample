const testSite = require('../testSite')

jest.setTimeout(8000);

test('testSite should log the page title of the entered website', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await testSite('https://www.amazon.com');
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(String));

    consoleSpy.mockRestore();
  });