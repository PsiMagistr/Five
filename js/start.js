window.addEventListener("load",function(){
    let game = new Game("#holst", "images/balls2.png", 55, 10);
    let btnstart = document.querySelector("#start");
    btnstart.addEventListener("click", function(){
        game.start();
    });
});