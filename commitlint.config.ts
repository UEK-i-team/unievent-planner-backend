const expectedTypes = ['feat', 'fix'];

module.exports = {
  plugins: [
    {
      rules: {
        // Explicitly type the return value
        'custom-type-enum': ({
          type,
        }: {
          type: string;
        }): [boolean, string?] => {
          if (!expectedTypes.includes(type)) {
            return [
              false,
              `Type must be one of: ${expectedTypes.join(', ')}.\nExample: feat: add new feature`,
            ];
          }
          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-type-enum': [2, 'always'],
  },
};
