const fs =require('fs');
const User ={
    filename: './src/data/dataBaseProfiles.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },
    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.userId +1;
        }
        return 1;
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.userId===id );
        return userFound;
    },
    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field]===text );
        return userFound;
    },
    create: function(UserData){
        let allUsers = this.findAll();
        let newUser = {
            userId: this.generateId(),
            ...UserData,
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ' '))
        return newUser;        
    },
        delete: function (id){
        let allUsers = this.findAll();
        let finalUsers= allUsers.filter(oneUser => oneUser.userId !== id);
        fs.writeFileSync(this.filename, JSON.stringify(finalUsers, null, ' '));
        return true;
    },

}
   const c = {
    "userName": "kevin",
    "userEmail": "kevin@carta.cl",
    "userCategory": "Estudiante",
    "userPassword": "A1087492236",
    "userImage": "1649626787407.png"
}
  

module.exports = User;