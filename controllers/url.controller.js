import { nanoid } from "nanoid";
import Url from "../models/url.model.js";

export const genertaShortUrl = async (req, res) => {
    const {url} = req.body;
    if(!url){
        return res.status(400).json({message: "Url is required!!"})
    }
    const shortId = nanoid(8)
    await Url.create({
        shortId : shortId,
        redirectUrl : url,
        visitHistory : [],

    })

    return res.json({id: shortId})
};

export const redirectUser = async (req,res)=>{
    const {shortId} = req.params;

    const entry = await Url.findOneAndUpdate({
        shortId
    },{ $push :{
        visitHistory : {
            timestamp : Date.now()
        },
    }})

     if (!entry) {
        return res.status(404).json({ message: "URL not found" });
    }

    const newLik = entry.redirectUrl;
    res.redirect(newLik)
}