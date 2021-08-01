
class User
{
    #storageKey = 'users'
    constructor() {

        let localStorageData = localStorage.getItem(this.#storageKey)

        this.users = localStorageData ? JSON.parse(localStorageData) : []
    }

    all() {
        return this.users
    }

    store(input) {
        this.users.push(input)
        console.log(input);
        this.saveToStorage()
    }

    findUserById(id) {
        if(this.users.length === 0) return null
        return this.users[id]
    }

    update(id, input) {
        this.users[id] = input
        this.saveToStorage()
    }

    saveToStorage() {
        localStorage.setItem(this.#storageKey, JSON.stringify(this.users))
    }

    destroy(id) {
        this.users.splice(id,1)
        this.saveToStorage()
    }
}