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
                      this.setBall(x,y, 1);
                 //}
                //this.setBall(x,y, 1);
                //this.setFive(1);
                this.setFive3(x, y , 5);

            }

            //this.setFive(1);


    }

    checkDiagonals(colornum, dx, dy) //Диагонали
    {
        let rd = [];
        let ld = [];

        for(let i = 0; i < 5; i++)
        {
            if(this.ceils[i + dy][5 - i + dx - 1].ball == colornum)
            {
                rd.push(new Point(5 - i + dx - 1, i + dy));
            }

            if(this.ceils[i + dy][i + dx].ball == colornum)
            {
                ld.push(new Point(i+dx, i+dy));
            }

        }

        if(rd.length == 5)
        {
            this.result = this.result.concat(rd);
            //result.push("диагональ  справа-налево");
        }

        if(ld.length == 5)
        {
            this.result = this.result.concat(ld);
            //result.push("диагональ  слева-направо");
        }

        //return result;
    }

    checklines(colornum, dx, dy) //Вертикаль и горизонталь
    {
        let h = [];
        let v = [];
        for(let row = dx; row < 5 + dx; row++)
        {
            if(this.ceils[dy][row].ball == 1)
            {
                h.push(new Point(row, dy));

            }
            if(this.ceils[row][dy].ball == 1)
            {
                v.push(new Point(dy, row));
            }
        }

        if(h.length == 5)
        {
            this.result = this.result.concat(h);
        }

        if(v.length == 5)
        {
            this.result = this.result.concat(v);
            //result.push("вертикаль");
        }

        //return result;
    }

        setFive(colornum)
        {
            //Диагонали
            this.result = [];
            for(let dy = 0; dy < 6; dy++) //6
            {
                for(let dx = 0; dx < 6; dx++) // 6
                {
                    this.checkDiagonals(colornum, dy, dx);

                }

            }

            ////Вертикали и горизонтали...

            for(let dy = 0; dy < 10; dy++)
            {
                for(let dx = 0; dx < 6; dx++)
                {
                    this.checklines(colornum, dx, dy);

                }
            }


            if(this.result.length > 0)
            {

               setTimeout(this.reload.bind(this),500);

            }

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
                    //this.scena.drawImage(this, 120,0, 40,40, x * size + 1 * (x + 10) + size / 2 - 20, y * size + 1 * (y + 10) + size / 2 - 20, 40, 40);
                }

            }
            this.randomBalls();

        }

    randomInteger(min, max)
    {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    randomBalls() //Переделать.
    {
        let x;
        let y;
        let color = 1;
        for(let i = 0; i < 4; i++)
        {
            do{
                x = this.randomInteger(0, 9);
                y = this.randomInteger(0, 9);
            }while(this.ceils[y][x].ball > 0)
            let color = this.randomInteger(1, 6);
            this.setBall(x, y, color);
            this.setFive(color);
        }


    }


    ///////////////////////////

    check2(x, y, color)
    {
        let num = 0;
        for(let i = 1; i < 5; i++)
        {
           if(this.ceils[y][x].ball == color && this.ceils[y][x + i].ball == color && this.ceils[y][x - i].ball == color)
           {
               this.result.push(new Point(x, y), new Point(x + i, y), new Point(x - i, y));
           }
        }

        if(this.result.length > 0){
                setTimeout(this.reload.bind(this), 1000);
        }

    }


    check(x, y, color)
    {
        if((this.ceils[y][x].ball == color))
        {
            if(x - 2 > -1 && x + 2 < 10) {
                //alert(x);
                if ( // Горизонтали
                (this.ceils[y][x + 1].ball == color) &&
                (this.ceils[y][x + 2].ball == color) &&
                (this.ceils[y][x - 1].ball == color) &&
                (this.ceils[y][x - 2].ball == color)

                ) {
                    this.result.push(new Point(x, y), new Point(x + 1, y), new Point(x + 2, y), new Point(x - 1, y), new Point(x - 2, y));
                }
            }

            if(y - 2 > -1 && y + 2 < 10)
            {
                if( //Вертикали
                (this.ceils[y + 1][x].ball == color) &&
                (this.ceils[y + 2][x].ball == color) &&
                (this.ceils[y - 1][x].ball == color) &&
                (this.ceils[y - 2][x].ball == color)

                )
                {
                    this.result.push(new Point(x, y), new Point(x, y + 1), new Point(x, y + 2), new Point(x, y - 1), new Point(x, y - 2));
                }
            }

            if(x - 2 > -1 && x + 2 < 10 && y - 2 > -1 && y + 2 < 10)
            {
                if( //Диагонали 2
                (this.ceils[y  + 1][x - 1].ball == color) &&
                (this.ceils[y + 2][x - 2].ball == color) &&
                (this.ceils[y - 1][x + 1].ball == color) &&
                (this.ceils[y - 2][x + 2].ball == color)

                )
                {
                    this.result.push(new Point(x, y), new Point(x + 1, y - 1), new Point(x + 2, y - 2), new Point(x - 1, y + 1), new Point(x - 2, y + 2));
                }

                if( //Диагонали 2
                (this.ceils[y  + 1][x + 1].ball == color) &&
                (this.ceils[y + 2][x + 2].ball == color) &&
                (this.ceils[y - 1][x - 1].ball == color) &&
                (this.ceils[y - 2][x - 2].ball == color)

                )
                {
                    this.result.push(new Point(x, y), new Point(x + 1, y + 1), new Point(x + 2, y + 2), new Point(x - 1, y - 1), new Point(x - 2, y - 2));
                }

            }

            if(this.result.length > 0)
            {
                setTimeout(this.reload.bind(this), 500);
            }



        }


    }

    setFive2(x, y)
    {
        let color = this.ceils[y][x].ball;
        this.result = [];

        for(let y = 0; y < 10; y++)
        {
            for(let x = 0; x < 10; x++)
            {
               this.check(x, y, color);
            }
        }
      // setTimeout(this.reload.bind(this), 500);

    }



    setFive3(x, y, count)
    {
        let s;
        let f;
        this.result = [];
        let temp = [];
        let color = this.ceils[y][x].ball;
        f = x + y + 1;

       if(y < x){ //верхняя половина
           s = x - y;
           for(let i = s; i < 10; i++)
           {
               if(this.ceils[i - s][i].ball == color)
               {
                   temp.push(new Point(i, i  - s));
                   if(temp.length > count - 1)
                   {
                       this.result = this.result.concat(temp);
                   }
               }
               else{
                   temp  = [];
               }
           }
       }
       else{ //Нижняя половина
           temp = [];
           for(let i = 0; i < 10 - y + x; i++) {
               if (this.ceils[i + (y - x)][i].ball == color) {
                   temp.push(new Point(i, i + (y - x)));
                   if (temp.length > count - 1) {
                       this.result = this.result.concat(temp);
                   }
               }
               else {
                   temp = [];
               }
           }
           //alert("Ниже главной диагонали");
       }

       //
        temp = [];
        if(10 - y > x) //верхнее
        {
           for(let i = 0; i < f; i++)
           {
               let y2 =  y - i + x;
               //console.log(z);//
               if(this.ceils[y2][i].ball == color)
               {
                   temp.push(new Point(i, y2));
                   if (temp.length > count - 1) {
                       this.result = this.result.concat(temp);
                   }

               }
               else{
                 temp = [];
               }
           }
        }

        temp = [];
        for(let x = 0; x < 10; x++)
        {
           if(this.ceils[y][x].ball == color)
           {
              temp.push(new Point(x, y));
              //alert(temp.length);
              if(temp.length > count - 1)
              {
                  this.result = this.result.concat(temp);
              }
           }
           else
           {
              temp = [];
           }
        }

        temp = [];
        for(let y = 0; y < 10; y++)
        {
            if(this.ceils[y][x].ball == color)
            {
                temp.push(new Point(x,y));
                if(temp.length > count - 1)
                {
                    this.result = this.result.concat(temp);
                }
            }
            else
            {
                temp = [];
            }
        }
         setTimeout(this.reload.bind(this), 500);

    }

}
