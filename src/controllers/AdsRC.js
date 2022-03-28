const users = require("../model/UserModel")
const categories = require("../model/CategoryModel");
const ads = require("../model/AdsModel");
const {
    AddAdsValidation
} = require("../modules/validations");
const path = require("path");

const {
    default: slugify
} = require("slugify");
const mongoose = require("mongoose")


module.exports = class AdsRC {

    static async AdsAddGetC(req, res) {
        try {
            res.render("ads_add", {
                user: req.user,
                categories: await categories.find()
            })
        } catch (error) {
            console.log(error);
        }
    }


    static async AdsAddPostC(req, res) {
        try {
            // const data = await AddAdsValidation(req.body)
            const {
                title,
                description,
                currency,
                category,
                location,
                phone,
                price
            } = await AddAdsValidation(req.body)
            let photos = []
            // console.log(data);

            console.log(req.files);
            if (Array.isArray(req.files.photos)) {
                req.files.photos.forEach(photo => {
                    const name = photo.md5 + ".jpg"
                    photo.mv(path.join(__dirname, "..", "public", "uploads", name))

                    photos.push(name)

                    // console.log(req.files.photos);
                    // console.log(photos);

                });
            } else {
                const name = req.files.photos.md5 + ".jpg"
                req.files.photos.mv(path.join(__dirname, "..", "public", "uploads", name))
                photos.push(name)
                // console.log(req.files.photos);
                // console.log(photos);
            }
            const slug = slugify(title, {
                lower: true,
                strict: true,
                replacement: "_",
            }) + Date.now();

            let a = await ads.create({
                title,
                description,
                price,
                currency,
                location,
                photos,
                phone,
                slug: slug,
                //    category_id: category,

                category_id: mongoose.Types.ObjectId(category),
                owner_id: req.user._id,
            })
            console.log(a);


            res.redirect("/ads/" + slug);
        } catch (error) {
            console.log(error);
            res.render("ads_add", {
                user: req.user,
                categories: await categories.find(),
                error: error + "",
            })

        }
    }



    // static async AdsOneGetC(req, res) {
    //     try {
    //         let adsOne = await ads.findOne({
    //             slug: req.params.slug,
    //         }).populate("owner_id")
    //         .populate("category_id")
    //         console.log(adsOne);
    //         res.render("ads_page")
    //     } catch (error) {
    //         console.log(error);
    //         res.render("ads_page", {
    //             ads: adsOne,    
    //             user: req.user,
    //         });

    //     }

    // }


    static async AdsOneGetC(req, res) {
		const adsOne = await ads
			.findOne({
				slug: req.params.slug,
			})
			.populate("owner_id")
			.populate("category_id");

		res.render("ads_page", {
			ads: adsOne,
			user: req.user,
		});
	}
}