export class userAlreadyExistsError extends Error{

    constructor(){
        super('e-mail already exists')
    }
}