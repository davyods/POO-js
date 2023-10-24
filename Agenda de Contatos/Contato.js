export class Contato {
    #name;
    #address;
    #phone;
    #cpf;
    #birthDay;

    constructor(name, address="", phone="", cpf, birthDay) {
        this.#name = name.toUpperCase();
        this.#address = address.toUpperCase();
        this.#phone = phone;
        this.#cpf = cpf;
        this.#birthDay = birthDay;
    }

    get name() {
        return this.#name;
    } 

    set name(newName) {
        if (newName == "") {
            return null;
        }
        this.#name = newName.toUpperCase();
        return this.#name;
    }

    get address() {
        return this.#address;
    }

    set address(newAddress) {
        if (newAddress == "") {
            return null;
        }
        this.#address = newAddress.toUpperCase();
        return this.#address;
    }
    
    get phone() {
        return this.#phone;
    }

    set phone(newPhone) {
        if (newPhone == "" || newPhone.length != 11) {
            return null;
        }
        this.#phone = newPhone;
        return this.#phone;
    }
    
    get cpf() {
        return this.#cpf;
    }

    get birthDay() {
        return this.#birthDay;
    }

    set birthDay(newBirthDay) {
        if (newBirthDay == "" || newBirthDay.length != 10) {
            return null;
        }
        this.#birthDay = newBirthDay;
        return this.#birthDay;
    }

    toString(){
        return "Nome: " + this.#name +
            "\nTelefone: " + this.#phone +
            "\nEndereço: " + this.#address +
            "\nCPF: " + this.#cpf +
            "\nAniversário : " + this.#birthDay;
    }

    stringify(){
        return '\n{' + 
                '\n\t"name" : "' + this.#name + '" ,' + 
                '\n\t"address" : "' + this.#address + '" ,' +
                '\n\t"phone" : "' + this.#phone + '" ,' +
                '\n\t"cpf" : "' + this.#cpf + '" ,' +
                '\n\t"birthDay" : "' + this.#birthDay + '"' +
                '\n}'; 
    }
}