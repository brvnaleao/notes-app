const fs = require('fs')
const chalk = require('chalk')

const getNotes = ( title )=>{
    var notes = loadNotes()
    var response = ''
    var bold = chalk.bold
    debugger
        if( notes.length !== 0 ){
            if( title ){
                var specificNote = notes.find( note => note.title === title )
                console.log( chalk.inverse( "Your note:\n" ) )
                
                console.log(bold( "Title:  ") + specificNote.title + 
                            "\n" +  bold("Body: ") + specificNote.body + "\n\n -----------")

            }else{

                notes.forEach( note => {
                    response +=  bold("Title: ") + note.title + bold("\nBody: ") + note.body + "\n\n -----------\n"
                });
                console.log( chalk.inverse( "All your notes:\n" ) )
                console.log ( response )
            }
            
        }else{
            console.log( 'There\'s no note avaliable' )
        }
}
const listNotes= () => {
    var notes = loadNotes()
    console.log( chalk.inverse( "Your Notes:\n" ) )
    notes.forEach( note => console.log ( note.title ))
}
const addNote = (title, body) => {

    const notes = loadNotes()
    const duplicated = notes.find((note) => note.title === title)
  
    if(!duplicated){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added correctly!'))
    }else{
        console.log(chalk.red.inverse("It's not possible to save data with title!"))
    }
}
const deleteNote = (index) => {
    const notes = loadNotes()
    const filterResut = notes.filter(note => note.title !== index)

    if(notes.length > filterResut.length){
        saveNotes(filterResut)
        console.log(chalk.green.inverse('Note removed correctly'))
    }else{
        console.log(chalk.red.inverse('Resource not found'))
    }
}

const saveNotes = (arr) =>{
        const dataJSON = JSON.stringify(arr)
        fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const data = JSON.parse( dataBuffer.toString() )
        return data  
    }catch(err){
        return []
    }
    
}

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    listNotes
}