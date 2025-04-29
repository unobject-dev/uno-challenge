const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, '/modules/**/*.type.graphql'))
);

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, '/modules/**/*.resolver.js'))
);

module.exports = { typeDefs, resolvers };
