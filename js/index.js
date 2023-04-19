// Definitions
const userInfo = { 
    'id': 27,
    'username': 'hoziest'
 }

// Initial Render
document.addEventListener("DOMContentLoaded", function() {

    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
        data.forEach(book => addBook(book))
    })
});

// Callbacks

function addBook(book) {
    const li = document.createElement('li')
    li.textContent = book.title
    li.addEventListener('click', () => {
        const panel = document.querySelector('#show-panel')
        panel.innerHTML = ''

        let thumbnail = document.createElement('img')
        let title = document.createElement('h4')
        let subtitle = document.createElement('h4')
        let author = document.createElement('h4')
        let description = document.createElement('p')
        let userList = document.createElement('ul')
        let button = document.createElement('button')
        panel.append(thumbnail, title, subtitle, author, description, userList, button) 

        thumbnail.src = book.img_url
        title.textContent = book.title
        subtitle.textContent = book.subtitle
        author.textContent = book.author
        description.textContent = book.description
        function addUsers() {
            userList.innerHTML = ''
            book.users.forEach(user => {
                let username = document.createElement('li')
                username.textContent = user.username
                userList.appendChild(username)
            })
        }
        addUsers()

        button.textContent = 'LIKE'
        for (const user of book.users) {
            if (user.id === userInfo.id && user.username === userInfo.username) {
                button.textContent = 'UNLIKE'
            }
        }

        button.addEventListener('click', () => {
            if (button.textContent === 'LIKE') {
                book.users.push(userInfo)
                fetch(`http://localhost:3000/books/${book.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'users': book.users})
                })
                .then(() => {
                    button.textContent = 'UNLIKE'
                    addUsers()
                })
            } else if (button.textContent = 'UNLIKE') {
                book.users = book.users.filter(user => {
                    return user.id !== userInfo.id && user.username !== userInfo.username
                })
                fetch(`http://localhost:3000/books/${book.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'users': book.users})
                })
                .then(() => {
                    button.textContent = 'LIKE'
                    addUsers()
                })
            }

        })
    })
    document.querySelector('#list').appendChild(li)
}
