import { merge } from "lodash-es";

//const authResolver = require('./auth');
import { createUserResolver, GETusersResolver } from "./resolvers.js";

let rootResolver;

rootResolver = merge(
  createUserResolver,
  GETusersResolver,
);

export default rootResolver;
