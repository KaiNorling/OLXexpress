// const categories = require  ("./src/model/CategoryModel")


// (async () => {
//     const data = await categories.insertMany(
//         [
//         {name:"Books" , photo:"1.png",},
//         {name:"Clothes" , photo:"2.png",},
//         {name:"Property" , photo:"3.png",},
//         {name:"Animals" , photo:"4.png",},
//         {name:"Electronics" , photo:"5.png",},
//         {name:"Home" , photo:"6.png",},
//         {name:"Consructions" , photo:"7.png",},
//         {name:"Food" , photo:"8.png",},
//         {name:"Job" , photo:"Nophoto.png",},
//     ]);
//     console.log(data);
// })()


const categories = require  ("./src/model/CategoryModel")


async function category () {
    const data = await categories.insertMany(
                [
                {name:"Books" , photo:"1.png",},
                {name:"Clothes" , photo:"2.png",},
                {name:"Property" , photo:"3.png",},
                {name:"Animals" , photo:"4.png",},
                {name:"Electronics" , photo:"5.png",},
                {name:"Home" , photo:"6.png",},
                {name:"Consructions" , photo:"7.png",},
                {name:"Food" , photo:"8.png",},
                {name:"Job" , photo:"Nophoto.png",},
            ]);
  
    console.log(data);
};

category()