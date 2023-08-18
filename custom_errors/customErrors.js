class dBInsertError extends Error{
   
     constructor(message){
        super(message);
        this.name = 'DbInsertError'
    }
}


module.exports = {dBInsertError}