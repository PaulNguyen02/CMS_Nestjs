export const uploadBody = {
  schema: {
    type: 'object',
    properties: {
      file: { type: 'string', format: 'binary' },
      memberId: { type: 'string' },
    },
    required: ['file'],
  },
};