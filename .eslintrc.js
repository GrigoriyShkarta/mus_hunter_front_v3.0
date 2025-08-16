module.exports = {
  rules: {
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
      },
    ],
  },
};
