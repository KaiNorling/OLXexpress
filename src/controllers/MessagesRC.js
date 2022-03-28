const users = require("../model/UserModel")
const messages = require("../model/MessagesModel")
const {
    isValidObjectId
} = require("mongoose");
const { MessagesValidation } = require("../modules/validations");

module.exports = class MessagesRC {
        static async MessagesGetC(req, res) {

            try {
                const isValidId = isValidObjectId(req.params?.id);
                if (!isValidId) throw new Error("Invalid");

                const receiver_id = await users.findOne({
                    _id: req.params.id,
                });

                if (!receiver_id) throw new Error("User not found");

                const chats = await messages.find({
                        $or: [{
                                $and: [{
                                        owner_id: req.user._id,
                                    },
                                    {
                                        receiver_id: receiver_id._id
                                    },
                                ],
                            },
                            {
                                $and: [{
                                        receiver_id: req.user._id,
                                    },
                                    {
                                        owner_id: receiver_id._id,
                                    },
                                ],
                            },
                        ],
                    })
                    .sort([
                        ["created_at", 1]
                    ]);

                res.render("messages", {
                    user: req.user,
                    receiver: receiver_id,chats,
                   
                });
            } catch (error) {
                console.log(error);
                res.redirect("/");
            }}

            //    try {
            //      const isValidId =isValidObjectId(req?.params?.id)

            //     if(!isValidId)throw new Error("Invalid")
            //     const receiver_id=await users.findOne({_id:req.params.id})
            //     if(!receiver_id)throw new Error("User Not Found")
            //     console.log(receiver_id);

            //     const chats = await messages.find({
            //         $or:[
            //             {$and:[{owner_id:req.user._id,},{receiver_id:req.user._id}]},
            //             {$and:[{receiver_id:req.user._id},{owner_id:req.user._id,},]},
            //         ]
            //     })


            //     res.render("messages",{receiver:receiver_id , user:req.user})
            //    } catch (error) {
            //         console.log(error);
            //         res.redirect("/")
            //    }

            // }

            static async MessagesPostC(req, res) {
                   
                    try {
                        const { message_text} = await MessagesValidation(req.body);
                        // const { message } = req.body;
                       
                        if(!(isValidObjectId(req.user._id) && isValidObjectId(req.params?.id))) throw new Error("Id is invalid!")
            
            
                        const chat = await messages.create({
                            message_text: message_text,
                            owner_id: req.user._id,
                            receiver_id: req.params.id,
                        })
             
                    console.log(chat); 
                    res.redirect("/messages/" + req.params.id);
                    // res.json({
                    //     ok: true,
                    // });
                } catch (error) {
                    console.log(error);
                    res.redirect("/messages/" + req.params.id);
                    // res.json({
                    //     ok: false,
                    //     message: error + "",
                    // });
                }
            }
        }