/**
 * Created by Pavel on 05.04.2021.
 */
class Game
{
    constructor(cnvid, picpath, size, count)
    {
        this.pic = new Image();
        this.oldX = -1;
        this.oldY = -1;
        this.flag = false;
        this.size = size;
        this.pic.src = picpath;
        this.canvas = document.querySelector(cnvid);
        this.scena = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ballsize = 40;
        this.ceils = [];
        this.result = [];
        let $this = this;
        this.pic.addEventListener("load", function()
        {
            for(let y = 0; y < count; y++)
            {
                $this.ceils[y] = [];
                for(let x = 0; x < count; x++)
                {
                    $this.ceils[y][x] = new Ceil();
                    $this.setBall(x, y, 0);
                    //this.scena.drawImage(this, 120,0, 40,40, x * size + 1 * (x + 10) + size / 2 - 20, y * size + 1 * (y + 10) + size / 2 - 20, 40, 40);
                }
            }
            $this.canvas.addEventListener("click", $this.clicker.bind($this));
        });

    }

    setBall(x, y, ballnum, color = "#87CEFA")
    {
        this.ceils[y][x].fieldColor = color;
        this.scena.fillStyle = color;
        this.scena.fillRect(x * this.size + 1 * (x + 10), y * this.size + 1 * (y + 10), this.size, this.size);
        this.ceils[y][x].ball = ballnum;
        let dx = (this.ceils[y][x].ball - 1) * this.ballsize;
        this.scena.drawImage(this.pic, dx, 0, this.ballsize, this.ballsize, x * this.size + 1 * (x + 10) + this.size / 2 - this.ballsize / 2, y * this.size + 1 * (y + 10) + this.size / 2 - this.ballsize /2, 40, 40);

    }

    clicker(ev)
    {
            //let arr;
            //this.result = [];
            if(ev.offsetX > 10 && ev.offsetX < (this.size + 1) * 10 && ev.offsetY > 10 && ev.offsetY < (this.size + 1) * 10)
            {
                    let x = Math.floor((ev.offsetX - 10) / (this.size + 1));
                    let y = Math.floor((ev.offsetY - 10) / (this.size + 1));
                    /*if(this.ceils[y][x].ball > 0)
                    {
                        if(this.flag == false)
                        {
                            this.flag = true;
                        }
                        else
                        {
                            this.setBall(this.oldX,this.oldY,this.ceils[this.oldY][this.oldX].ball);
                        }
                        this.oldX = x;
                        this.oldY = y;
                        this.setBall(x,y,this.ceils[y][x].ball, "#CCCCCC");
                    }
                    else{
                        alert("Перенос");
                    }*/

                    /////
                 // if(x > 1 && y > 1 && x < 12 && y < 12)
                 //{
                      //alert();
                      this.setBall(x,y, 2);
                 //}
                //this.setBall(x,y, 1);
                //this.setFive(1);
                this.setFive(x, y , 5);

            }

            //this.setFive(1);


    }
        reload()
        {
            for(let i = 0; i < this.result.length; i++)
            {
                let x = this.result[i].x;
                let y = this.result[i].y;
                this.setBall(x, y, 0);
            }

        }

        start()
        {
            for(let y = 0; y < 10; y++) //Стартовая
            {
                for(let x = 0; x < 10; x++)
                {
                    this.setBall(x, y, 0);
                }

            }
            this.randomBalls(3);

        }

    randomInteger(min, max)
    {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    randomBalls(num) //Переделать.
    {
        let x;
        let y;
        let color = 1;
        let colors = [1, 2, 3, 4, 5, 6];
        this.shuffle(colors);
        for(let i = 0; i < num; i++)
        {
            /*do{
                x = this.randomInteger(0, 9);
                y = this.randomInteger(0, 9);
            }while(this.ceils[y][x].ball > 0)

            this.setBall(x, y, color);
            this.setFive(x, y, 5);*/
            let color = colors[i];
            let tmp = this.getClearCeils();
            let rnd = this.randomInteger(0, tmp.length - 1);
            let elem = tmp[rnd];
            this.setBall(elem.x, elem.y, color);
            this.setFive(elem.x, elem.y, 5);
        }


    }

    getClearCeils() //Поиск чистых ячеек
    {
        let temp = [];
        for(let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++)
            {
              if(this.ceils[y][x].ball == 0)
              {
                 temp.push(new Point(x, y));
              }
            }
        }
        return temp;
    }

    ///////////////////////////

      check(x, y, count, color, temp)
      {

          if(this.ceils[y][x].ball == color)
          {
              temp.push(new Point(x, y));
              if(temp.length > count - 1)
              {
                  this.result = this.result.concat(temp);

              }
          }
          else{
              temp.length = 0;
          }
          //console.log(temp.length);
         // return temp;
      }

    shuffle(array) { //Тасование массива. Метод Фишера-Йетса
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
            let t = array[i]; array[i] = array[j]; array[j] = t;
        }
}


    setFive(x, y, count)
    {
        console.clear();
        let s;
        let f;
        this.result = [];
        let temp = [];
        let color = this.ceils[y][x].ball;
       f = x + y + 1;
       if(y < x){ //Верхняя половина. Диагональ слева-направо вниз
           s = x - y;
           for(let i = s; i < 10; i++)
           {
              this.check(i, i - s, count, color, temp);
           }
       }
       else{ //Нижняя половина. Диагональ слева-направо вниз.
           temp = [];
           for(let i = 0; i < 10 - y + x; i++) {
               this.check(i, i + (y - x), count, color, temp);
           }

       }

       //
        temp = [];
        if(10 - y > x) //верхнее. Слева направо вверх
        {
           for(let i = 0; i < f; i++)
           {
               let y2 =  y - i + x;
               this.check(i, y2, count, color, temp);
           }
        }
        else { //Нижнее  Слева направо вверх.
            let i2 = -1;
            for(let i = x - (9 - y); i < 10; i++)
            {
                i2++;
                let y2 = 9 - i2;
                this.check(i, y2, count, color, temp);
            }

        }

        temp = [];
        for(let x = 0; x < 10; x++) //Горизонтали
        {
           this.check(x, y, count, color, temp);
        }

        temp = [];
        for(let y = 0; y < 10; y++) //Вертикали
        {
             this.check(x, y, count, color, temp);
        }
        
        if(this.result.length > 0)
        {
            setTimeout(this.reload.bind(this), 500);
        }


    }

}
