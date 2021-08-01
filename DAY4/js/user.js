
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

    store(user) {
        this.users.push(user)
        this.saveToStorage()
    }

    update(id, user) {
        this.users[id] = user
        this.saveToStorage()
    }

    findById(id) {
        if (this.users.length === 0) return null

        return this.users[id]
    }

    destroy(id) {
        this.users.splice(id, 1)
        this.saveToStorage()
    }

    saveToStorage() {
        localStorage.setItem(this.#storageKey, JSON.stringify(this.users))
    }
}