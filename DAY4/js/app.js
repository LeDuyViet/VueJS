let btnRegister = document.querySelector('.btn-register')
let fullnameEl  = document.querySelector('#fullname')
let emailEl     = document.querySelector('#email')
let phoneEl     = document.querySelector('#phone')
let addressEl   = document.querySelector('#address')
let userClass   = new User;

let isValidEmail = function(email) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
}

function validateForm() {
    let fullname = _.trim(fullnameEl.value)
    let email    = _.trim(emailEl.value)
    let phone    = _.trim(phoneEl.value)
    let address  = _.trim(addressEl.value)

    let errorFullname = ''
    let errorEmail    = ''
    let errorPhone    = ''

    // Validate for fullname
    if (_.isEmpty(fullname)) {
        errorFullname = 'Please enter your fullname'
    } else if (!_.isEmpty(fullname) && fullname.length < 2) {
        errorFullname = 'Can not less than 2 character'
    }

    // Validate for email
    if (_.isEmpty(email)) {
        errorEmail = 'Please enter your email'
    } else if (!isValidEmail(email)) {
        errorEmail = 'Email format is wrong'
    }

    // Validate phone
    if (_.isEmpty(phone)) {
        errorPhone = 'Please enter your phone'
    } else if (isNaN(phone)) {
        errorPhone = 'Your phone must be number'
    } else if (phone.length !== 10) {
        errorPhone = 'Your phone is wrong format'
    }

    document.querySelector('span.error__fullname').innerHTML = errorFullname
    document.querySelector('span.error__email').innerHTML    = errorEmail
    document.querySelector('span.error__phone').innerHTML    = errorPhone

    if (fullname && email && phone) {
        return {
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
        }
    }

    return false
}

function renderUser() {
    let users = userClass.all()

    let content = `<tr>
        <th>Fullname</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Action</th>
    </tr>`

    users.forEach((user, index) => {
        content += `
            <tr>
                <td>${user.fullname}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <a href='#' onclick="editUser(${index})">Edit</a> | 
                    <a href='#' onclick="deleteUser(${index})">Delete</a>
                </td>
            </tr>`
    })

    document.querySelector('#table-user-list').innerHTML = content
}

function deleteUser(userId) {
    userClass.destroy(userId)
    renderUser()
}

function editUser(userId) {
    let user = userClass.findById(userId)

    fullnameEl.value = user.fullname
    emailEl.value    = user.email
    phoneEl.value    = user.phone
    addressEl.value  = user.address

    btnRegister.setAttribute('data-id', userId)

    renderUser()
}

renderUser()

btnRegister.addEventListener('click', function() {
    let input = validateForm()

    if (input) {

        // Do registration
        // Call API register to save
        // Store user to localStorage

        let userId = btnRegister.getAttribute('data-id')
        
        if (userId == 0 || !_.isEmpty(userId)) {
            // Update
            userClass.update(userId, input)
        } else {
            // Insert
            userClass.store(input)
        }

        renderUser()
    }
})
