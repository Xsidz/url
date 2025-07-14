import { nanoid } from "nanoid";
import Url from "../models/url.model.js";

export const generateShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ message: "URL is required!" });
        }

        
        try {
            new URL(url);
        } catch (error) {
            return res.status(400).json({ message: "Invalid URL format" });
        }

        const shortId = nanoid(8);
        
        await Url.create({
            shortId: shortId,
            redirectUrl: url,
            visitHistory: [],
        });

        
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const shortUrl = `${baseUrl}/${shortId}`;

        return res.json({
            id: shortId,
            shortUrl: shortUrl,
            originalUrl: url
        });
        
    } catch (error) {
        console.error('Error generating short URL:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const redirectUser = async (req, res) => {
    try {
        const { shortId } = req.params;

        const entry = await Url.findOneAndUpdate(
            { shortId },
            { 
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true } 
        );

        if (!entry) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.redirect(entry.redirectUrl);
        
    } catch (error) {
        console.error('Error redirecting user:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getUrlAnalytics = async (req, res) => {
    try {
        const { shortId } = req.params;
        
        const entry = await Url.findOne({ shortId });
        
        if (!entry) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.json({
            shortId: entry.shortId,
            originalUrl: entry.redirectUrl,
            totalClicks: entry.visitHistory.length,
            visitHistory: entry.visitHistory
        });
        
    } catch (error) {
        console.error('Error getting analytics:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};