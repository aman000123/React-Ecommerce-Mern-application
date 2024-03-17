

import bcrypt from 'bcryptjs'

export const hashPassword = async (password) => {
    try {

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashed pashword", hashPassword)
        return hashedPassword


    } catch (err) {
        console.log("error in hashing")
    }

}


export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)

}