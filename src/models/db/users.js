const db = require('./db')
const bcrypt = require('bcrypt')
const saltRounds = 10

// create user

const create = (username, password) => {
    bcrypt.hash(password, saltRounds).then((hash) => {
        return db.query(`
        INSERT INTO users
        (username, encrypted_password)
        VALUES
        (lower($1::text), $2::text)
        RETURNING
        *
        `,
        [
            username,
            hash
        ])
        .catch(error => {
            console.error({
                message: 'Error occurred while executing users.create',
                arguments: arguments
            })
            throw error
        })
    })
}

// find user by id

const findById = (userId) => {
    return db.any(`
    SELECT * FROM users WHERE id = $1::int
    `,
    [userId])
    .then(user => user)
    .catch(error => {
        console.error({
            message: 'Error occurred while executing users.findUserById',
            arguments: arguments
        })
        throw error
    })
}

// get user name

const getUsername = (userId) => {
    return db.oneOrNone(`
    SELECT username FROM users WHERE id = $1::int
    `,
    [userId])
    .catch(error => {
        console.error({
            message: 'Error occurres while executing users.getUsername',
            arguments: arguments
        })
        throw error
    })
}

// find by username

const findByUsername = (username) => {
    return db.oneOrNone(`
    SELECT * FROM users WHERE id = $1::text
    `,
    [username])
    .catch(error => {
        console.error({
            message: 'Error occurres while executing users.findByUsername',
            arguments: arguments
        })
        throw error
    })
}

//  is the password valid

const isValidPassword = (userId, password) => {
    return findById(userId)
    .then(user => {
        return bcrypt.compare(password, user.password)
    })
}

// update username 

const updateUsername = (username, userId) => {
    return db.query(`
    UPDATE users SET username = $1::text WHERE id = $2::int RETURNING *
    `,
    [
        username,
        userId
    ])
    .catch(error => {
        console.error({
            message: 'Error occurs while executing users.updateUsername',
            arguments: arguments
        })
        throw error
    })
}

// update user image

const updateImage = (image, userId) => {
    return db.query(`
    UPDATE users SET image = $1::text WHERE id = $2::int RETURNING *
    `,
    [
        image,
        userId
    ])
    .catch(error => {
        console.error({
            message: 'Error occurs while executing users.updateImag',
            arguments: arguments
        })
        throw error
    })
}

// update user city

const userCity = (cityId, userId) => {
    return db.query(`
    UPDATE users SET city_id = $1::int WHERE id = $2::text RETURNING *
    `,
    [
        cityId,
        userId
    ])
    .catch(error => {
        console.error({
            message: 'Error occurs while executing users.userCity',
            arguments: arguments
        })
        throw error
    })
}

// delete user

const deleteUser = (userId) => {
    return db.query(`
    DELETE FROM users WHERE id = $1::int
    `,
    [userId])
    .catch(error => {
        console.error({
            message: 'Error occurs while executing users.deleteUser',
            arguments: arguments
        })
        throw error
    })
}

module.exports = {
    create,
    findById,
    getUsername,
    findByUsername,
    isValidPassword,
    updateUsername,
    updateImage,
    userCity,
    deleteUser
}