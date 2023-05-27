import graphql from "graphql";
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
import {Movie} from '../server/models/movie.js';
import {Director} from '../server/models/director.js';

// const directorsJson = [
//   { "name": "Quentin Tarantino", "age": 55 }, //6471e37085be981df75d3815
//   { "name": "Michael Radford", "age": 72 }, //6471e54785be981df75d3817
//   { "name": "James McTeigue", "age": 51 }, //6471e63785be981df75d3818
//   { "name": "Guy Ritchie", "age": 50 }, //6471e65885be981df75d3819
// ];
//
// const moviesJson = [
//   { "name": "Pulp Fiction", "genre": "Crime", "directorId": },
//   { "name": "1984", "genre": "Sci-Fi", "directorId": },
//   { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": },
//   { "name": "Snatch", "genre": "Crime-Comedy", "directorId": },
//   { "name": "Reservoir Dogs", "genre": "Crime", "directorId": },
//   { "name": "The Hateful Eight", "genre": "Crime", "directorId": },
//   { "name": "Inglorious Basterds", "genre": "Crime", "directorId": },
//   { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": },
// ]

// const movies = [
//   { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1', },
//   { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2', },
//   { id: 3, name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3', },
//   { id: 4, name: 'Snatch', genre: 'Crime-Comedy', directorId: '4', },
//   { id: 5, name: 'Reservoir Dogs', genre: 'Crime', directorId: '1', },
//   { id: 6, name: 'The Hateful Eight', genre: 'Crime', directorId: '1', },
//   { id: 7, name: 'Inglorious Basterds', genre: 'Crime', directorId: '1', },
//   { id: 8, name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4', },
// ]
//
// const directors = [
//   { id: '1', name: 'Quentin Tarantino', age: 55 },
//   { id: '2', name: 'Michael Radford', age: 72 },
//   { id: '3', name: 'James McTeique', age: 51 },
//   { id: '4', name: 'Guy Ritchie', age: 50 },
// ]

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(args.id)
        console.log(Director.findById(args.id))
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        console.log('hi')
        console.log(Movie.find({}))
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },
  },
});

export const newSchema = new GraphQLSchema({
  query: Query,
});
