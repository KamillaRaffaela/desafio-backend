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
        avatar_url:"https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        name:"Myke Brito",
        role: "Instrutor - Rocketseat",
        description:'Programador full-stack, focado em trazer o melhor ensino para em programação. Colaborador da <a href="https://Rocketseat.com.br">Rocketseat</a>',
        links: [
            {name: "Github", url: "https://github.com/maykbrito/"},
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