class Manager{
    constructor(name, id, email, officeNumber){
        this.name = name
        this.id = id
        this.email = email
        this.officeNumber = officeNumber
    }
    getRole(){

    }
    getOfficeNumber(){
        return this.officeNumber
    }
}

module.exports = Manager