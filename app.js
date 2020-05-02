
const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const { getNotes, addNote, deleteNote, listNotes } = require('./notes')


yargs.command({
    command: "add",
    builder: {
        title:
         {
            describe:"Note Title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe:"Note Title",
            demandOption: true,
            type: "string"
        }
    },
    describe: "Add a new note",
    handler: function(argv){
        addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: "remove",
    describe: "Remove a new note",
    builder:{
        title: {
            describe:"Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler: function(argv){
        deleteNote(argv.title)
    }
})
yargs.command({
    command: "list",
    describe: "Listing a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption:false,
            type: "string"
        }
    },
    handler: function(argv){
        listNotes() 
    }
})

yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption:false,
            type: "string"
        }
    },
    handler: ( argv )=>{
        if(argv.title !== undefined){
            getNotes(argv.title)
          
        }else{
            getNotes()
        }
    }
})
yargs.parse()

