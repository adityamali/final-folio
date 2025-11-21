module.exports = {
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'setupTests.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
};
