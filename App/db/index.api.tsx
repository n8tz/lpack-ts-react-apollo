/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import resolvers from "App/db/entities/**/(*).js"
import schemas   from "App/db/entities/**/(*).graphql"
import scalars   from "App/db/scalars/**/(*).js"

import {mergeResolvers, mergeTypeDefs} from '@graphql-toolkit/schema-merging';
import {GraphQLScalarType}             from 'graphql'

const graphql     = {
	schema:
		{
			typeDefs : mergeTypeDefs(
				[
					...Object.keys(scalars).map(typeId => "scalar " + typeId + '\n'),
					...Object.keys(schemas).map(typeId => schemas[typeId]),
					`
					type Query {
  						_byPassEmptyTypeError: Boolean ## hop
					}
					type Mutation {
  						_byPassEmptyTypeError: Boolean ## hop
					}
				      schema {
				        query: Query
				        mutation: Mutation
				      }
			`
				], {
					//useSchemaDefinition  : schemaDefinition,
					//forceSchemaDefinition: schemaDefinition,
					throwOnConflict    : true,
					commentDescriptions: true,
					reverseDirectives  : true,
					//...options,
				}),
			resolvers: mergeResolvers(
				[
					...Object.keys(scalars).map(typeId => ({ [typeId]: new GraphQLScalarType(scalars[typeId]) })),
					...Object.keys(resolvers).map(typeId => resolvers[typeId]),
					{}
				])
		}
};
export {graphql};