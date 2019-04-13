const graphql = require('graphql')
const _  = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {GraphQLObjectType ,GraphQLString,GraphQLList, GraphQLSchema,GraphQLID, GraphQLInt} = graphql;
var books = [
    {name : 'agha', genre : 'abx' , id :'1',authorId : '2'},
    {name : 'naveed', genre : 'adsx' , id :'2',authorId : '1'},
    {name : 'zul', genre : 'vcd' , id :'3',authorId : '3'},
]
var author = [
    {name : 'agha', age : 33 , id :'1'},
    {name : 'naveed', age :353 , id :'2'},
    {name : 'zul', age : 55 , id :'3'},
]
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields:()=>(
        {
            id : {type: GraphQLID},
            name : {type : GraphQLString},
            genre : {type : GraphQLString},
            author : {
                type : AuthorType,
                resolve(parent, args){
                  //  return _.find(author,{id:parent.authorId})
                }
            }
        }
    )
})

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields:()=>(
        {
            id : {type: GraphQLID},
            name : {type : GraphQLString},
            age : {type : GraphQLInt},
            books:{
                type: new GraphQLList(BookType),
                resolve(parent, args){
                    //return _.filter(books,{authorId : parent.id})
                }

            }
        }
    )
})


const RootQuery = new GraphQLObjectType({
    name : 'rootQueryType',
    fields : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLID}},

            resolve(parent , args){
                //code to get data from db
              //return  _.find(books , {id :args.id})

            }
        },
        author : {
            type : AuthorType,
            args : {id : {type:GraphQLID}},
            resolve(parent, args){
                //return _.find(author , {id : args.id})
            }
        },

        books:{
            type : new GraphQLList(BookType),
            resolve(parent, args){
                //return books
            }
        }
    
    },

    })

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields : {
        addAuthor:{
            type : AuthorType,
            args:{
                name : {
                    type: GraphQLString
                },
                age : {
                    type : GraphQLInt
                }
              
        },
        resolve(parent, args){
            let author = new Author({
                name :  args.name,
                age : args.age
            })
           return author.save()
        }
       
            
        },
        addBook:{
            type : BookType,
            args:{
                name : {
                    type: GraphQLString
                },
                genre : {
                    type : GraphQLString
                }
              
        },
        resolve(parent, args){
            let book = new Author({
                name :  args.name,
                genre : args.genre
            })
           return book.save()
        }
       
            
        }
    }
})
    module.exports = new GraphQLSchema({
        query : RootQuery,
        mutation : Mutation
    })