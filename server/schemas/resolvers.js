const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Catch } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    posts: async () => {
      console.log("queryposts")
      return await Post.find({});
    },
    post: async (parent, { _id }) => {

      console.log("querypost")
      return await Post.findById(_id).populate('catches');
    },
    postArea: async (parent, { latitude, longitude, radius }) => {

      return await Post.find( {location: { $geoWithin: { $center: [ [latitude, longitude], radius/1000]}}});
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        user.posts.sort((a, b) => b.dateTaken - a.dateTaken);
        user.catches.sort((a, b) => b.dateTaken - a.dateTaken);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

   
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { image, location, title }, context) => {

      console.log("here")

      // if (context.user) {
        const post = await Post.create({image, location, title});
        // await User.findByIdAndUpdate(context.user._id, { $push: { posts: post } });

        return post;
      // }

      // throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updatePost: async (parent, args, context) => {
 
      if (context.user) {
 
        const post = await Post.findByIdAndUpdate(args);
        return post;
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndDelete(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    deletePost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.findByIdAndDelete(args);
        // return await User.findByIdAndUpdate(context.user._id, { $pull: { posts: args } }
      
        return post;
      };

      throw new AuthenticationError('Not logged in');
    },

    addCatch: async (parent, { _id, image, location, title }, context) => {

      console.log("addCatch");

      // if (context.user) {
        const catch1 = await Catch.create({image, location, title});
        console.log(catch1);
        console.log(_id);
        const post = await Post.findByIdAndUpdate(_id, { $push: { catches: catch1._id } }, {new: true, useFindandModify: false});
        console.log(post);
        return post;
      // }

      // throw new AuthenticationError('Not logged in');
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
