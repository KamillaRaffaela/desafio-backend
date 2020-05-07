const express = require('express')
const nunjucks = require('nunjucks')


const server = express()
const videos = require("./data.js")



server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true 
})

server.get("/about", function(req, res){ 
    const about = {
        avatar_url:"https://avatars3.githubusercontent.com/u/58017246?s=460&u=457ffe96a40b0965d7cafd4fe69c3101b2cdae3a&v=4",
        name:"Kamilla Raffaela",
        role: "Programadora Junior",
        description:'Programadora full-stack, focado em trazer o melhor ensino para em programação. Colaborador da <a href="https://Rocketseat.com.br">Rocketseat</a>',
        links: [
            {name: "Github", url: "https://github.com/KamillaRaffaela"},
            {name: "Twitter", url: "https://twitter.com/maykbrito/"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/maykbrito/"}
        ]
    
    }


 return res.render("about", {about})
})

server.get("/portifolio", function(req, res){
    return res.render("portifolio", {items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id;
    const video = videos.find(function(video){
        return video.id == id 
    })

    if (!video){
        return res.send("video not found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function() {
    console.log("server is running")
})