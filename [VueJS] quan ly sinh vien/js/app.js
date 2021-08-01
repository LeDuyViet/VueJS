Vue.createApp({
    data() {
        return {
            // id student
            Student: {
                fullname: '',
                email: '',
                phone: '',
                gender: '',
            },
            Students: [],
            isShow: false,
            isRegister: false,
            // key update
            userUpdate: null,
            // data paging
            studentInPage: [],
            totalRecord: null,
            totalPage: null,
            numberPerPage: 3,
            page: null,

        }
    },

    methods: {
        saveLocalStorage() {
            localStorage.setItem('list-students', JSON.stringify(this.Students))
        },
        getLocalStorage() {
            let result = JSON.parse(localStorage.getItem('list-students'))

            return result
        },
        Paging(page) {
            this.Students = this.getLocalStorage()
            this.totalRecord = this.Students.length
            this.totalPage = Math.ceil(this.totalRecord / this.numberPerPage)
            // lay page hien tai
            this.page = page
            this.studentInPage = []
            let start = (this.page - 1) * this.numberPerPage 
            let end = start + this.numberPerPage
            if(end > this.totalRecord)
                end = this.totalRecord
            // push vao studentInPage de render
            for (let i = start; i < end; i++) {
                this.studentInPage.push(this.Students[i])
            }
        },
        // show or hide
        // xu ly paging truoc khi show
        showHideListStudents() {
            this.isShow = !this.isShow
            // neu show thi render
            if(this.isShow) {
                // Mới vào chưa chọn page thì sẽ mặc định là 1
                if(!this.page) {
                    this.page = 1
                }
                // render
                this.Paging(this.page)
            } else {
                // Nếu đóng thì clear để tránh bị duplicate dữ liệu lần show sau
                this.studentInPage = []
            }
        },
        // show or hide
        showHideRegister() {
            this.isRegister = !this.isRegister
        },
        isValidEmail(email) {
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
        },
        isValidFullName(fullname) {
            return /^[^!@#$%^&*()_+=]{3,50}$/.test(fullname)
        },
        isValidPhone(phone) {
            return /^[0-9]{10,11}$/.test(phone)
        },

        validate() {
            
            // fullname
            if(!this.isValidFullName(this.Student.fullname)) {
                alert('Empty or MareForm Fullname')
                return false
            }
            
            // email
            if(!this.isValidEmail(this.Student.email)) {
                alert('Empty or MareForm Email')
                return false
            }
            // phone
            if(!this.isValidPhone(this.Student.phone)) {
                alert('Empty or MareForm Phone')
                return false
            }
            return {
                fullname: this.Student.fullname,
                email: this.Student.email,
                phone: this.Student.phone,
                gender: this.Student.gender,
            }
        },
        register() {
            let resultValid = this.validate()
            if(resultValid) {
                if(this.userUpdate || this.userUpdate == 0) {
                    // update
                    this.Students[this.userUpdate] = resultValid
                } else {
                    // insert
                    this.Students = this.Students || []
                    this.Students.push(resultValid)
                }
                this.saveLocalStorage()
                this.Paging(this.page)
                this.Student.fullname = ''
                this.Student.email = ''
                this.Student.phone = ''
                this.Student.gender = ''
            }
        },
        edit(index) {
            let id = this.getIdReal(index)
            let studentEdit = this.Students[id]
            if(!_.isEmpty(studentEdit)) {
                this.Student.fullname = studentEdit.fullname
                this.Student.email = studentEdit.email
                this.Student.phone = studentEdit.phone
                this.Student.gender = studentEdit.gender
                // Lấy id của user cần update
                this.userUpdate = id
                // console.log(studentEdit);
            }

        },
        Delete(index) {
            let id = this.getIdReal(index)
            this.Students.splice(id,1)
            this.saveLocalStorage()
            // render
            this.Paging(this.page)
        },

        //Vấn đề xảy ra khi có phân trang, index truyền từ bên ngoài vào là index
        // bảng studentInPage ( bảng trung gian ) => hàm để lấy index trong Students
        getIdReal(index) {
            return (this.page - 1) * this.numberPerPage + index
        }

    }
}).mount('#app')