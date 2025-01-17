import { Router } from "express";
import { NewUser } from "../mongooseSchemas/signinUser.Schema.js";
import { generateAcsessToken, generateRefreshToken } from "../utility/genetageToken.js";

const router = Router();

router.post("/login", async (req, res) => {
    const data = req.body
    const findUser = await NewUser.findOne({ username: data.username })
    if (!findUser) return res.sendStatus(401)
    if (findUser.password !== data.password) {
        res.sendStatus(401)
    }
    if (findUser.password === data.password) {
        console.log(findUser)
        const accessToken = generateAcsessToken({ username: findUser.username })
        const refreshToken = generateRefreshToken({ username: findUser.username })
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 80,
            httpOnly: true,
            withCredentials: true,
            sameSite: 'None',
            secure: true
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            withCredentials: true,
            sameSite: 'None',
            secure: true
        })
        res.sendStatus(200)
    }
})

export default router